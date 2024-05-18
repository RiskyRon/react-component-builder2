from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.agents import AgentExecutor
from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from agents.create_agent import create_tools_agent
from prompts.default_chat_prompt import create_chat_prompt
from utils.tool_list import tools
from utils.model_selector import get_model
import uuid
import os

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

# Initialize Redis Chat History
redis_url = "redis://localhost:6379/0"
message_history = RedisChatMessageHistory(url=redis_url, ttl=3600, session_id="global-session")

@app.post("/chat")
async def chat(request: ChatRequest):
    user_input = request.input
    model_id = request.model_id
    selected_tools = request.selected_tools

    # Generate a unique session_id for the new conversation
    session_id = str(uuid.uuid4())

    # Create a new session for each conversation
    chat_history = RedisChatMessageHistory(session_id=session_id)

    llm = get_model(model_id)
    filtered_tools = [tool for tool in tools if tool.name in request.selected_tools]
    llm_with_tools = llm.bind_tools(filtered_tools)
    agent = create_tools_agent(prompt, llm_with_tools)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    # Convert RedisChatMessageHistory to a list of BaseMessage objects
    base_messages = [m for m in chat_history.messages if isinstance(m, BaseMessage)]

    result = agent_executor.invoke({"input": user_input, "chat_history": base_messages})

    # Save the conversation in the session
    chat_history.add_user_message(user_input)
    chat_history.add_ai_message(result["output"])

    return {
        "output": result["output"],
        "chat_history": chat_history.messages,
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
