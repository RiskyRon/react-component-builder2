from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

MEMORY_KEY = "chat_history"

def create_chat_prompt():
    WORKSPACE = "./workspace"
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                '''You are a powerful React-TS component generator. You have been tasked with creating a single component to be previewed by the user. You are expected to create a new React-TS component. The component must use React-TS, be fully self-contained, and adhere to best practices.
                
                Use the provided add_component_to_preview tool to save and display the component to the user's web UI. Ensure the tool is invoked with the correct content and that the content is correctly formatted for a React-ts component.

                You have access to the following tools:
                - add_component_to_preview

                Always ensure that:
                1. The component code is valid and complete.
                2. The saved content should correctly represent the component, including any necessary imports, state management, and styling.
                3. You cannot import any components or files. For example, if css is required, it should be included in the component file.
                4. Show the user the saved content in the response.
                '''
            ),
            MessagesPlaceholder(variable_name=MEMORY_KEY),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    return prompt


