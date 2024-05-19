from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.agents import AgentExecutor
from langchain_core.messages import AIMessage, HumanMessage
from langchain.memory import ConversationBufferMemory
from agents.create_agent import create_tools_agent
from prompts.default_chat_prompt import create_chat_prompt
from utils.tool_list import tools
from utils.model_selector import get_model
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prompt = create_chat_prompt()

class ChatRequest(BaseModel):
    input: str
    chat_history: list = []
    model_id: str
    selected_tools: list = []

class FileSaveRequest(BaseModel):
    path: str
    content: str

# Initialize Conversation Buffer Memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

@app.post("/chat")
async def chat(request: ChatRequest):
    user_input = request.input
    model_id = request.model_id
    selected_tools = request.selected_tools

    # Use Langchain memory for conversation history
    memory_variables = memory.load_memory_variables({})
    chat_history = memory_variables.get("chat_history", [])

    llm = get_model(model_id)
    filtered_tools = [tool for tool in tools if tool.name in selected_tools]
    llm_with_tools = llm.bind_tools(filtered_tools)
    agent = create_tools_agent(prompt, llm_with_tools)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    try:
        result = agent_executor.invoke({"input": user_input, "chat_history": chat_history})
    except json.decoder.JSONDecodeError as e:
        return {"error": "Invalid JSON in arguments", "message": str(e)}
    except Exception as e:
        return {"error": str(e)}

    # Save the conversation in the session
    memory.save_context(
        {"input": user_input},
        {"output": result["output"]}
    )

    return {
        "output": result["output"],
        "chat_history": memory.load_memory_variables({}).get("chat_history", []),
    }


@app.get("/models")
async def get_models():
    return {
        "models": [
            {"id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo"},
            {"id": "gpt-4o-2024-05-13", "name": "GPT-4 Omni"},
            {"id": "gpt-4-turbo", "name": "GPT-4 Turbo"},
            {"id": "claude-3-haiku", "name": "Claude-3 Haiku"},
            {"id": "claude-3-sonnet", "name": "Claude-3 Sonnet"},
            {"id": "claude-3-opus", "name": "Claude-3 Opus"},
            {"id": "mixtral-8x7b", "name": "Mixtral 8x7b"},
            {"id": "llama3-70b-8192", "name": "Llama3 70b"},
        ]
    }

@app.get("/tools")
async def get_tools():
    return {"tools": [tool.name for tool in tools]}

@app.get("/file")
async def get_file(path: str):
    try:
        with open(path, 'r') as file:
            return file.read()
    except Exception as e:
        return {"error": str(e)}

@app.post("/save")
async def save_file(request: FileSaveRequest):
    try:
        with open(request.path, 'w') as file:
            file.write(request.content)
        return {"status": "success"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8010)
