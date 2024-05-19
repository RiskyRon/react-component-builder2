# /Users/ron/Documents/projects/vite element highlighter/backend/tools/modify_component.py

from langchain.agents import tool
import os

@tool
def modify_component(content: str) -> str:
    """
    Modifies the contents of the existing NewComponent.tsx file based on the provided content.
    
    Args:
        content (str): The new content to incorporate into the existing file.
    
    Returns:
        str: The content of the modified file.
    """
    file_path = '/Users/ron/Documents/projects/vite element highlighter/frontend/src/components/NewComponent.tsx'
    
    try:
        with open(file_path, 'r') as file:
            existing_content = file.read()
        
        # Modify the existing content with the new content
        modified_content = f"{existing_content}\n\n{content}"
        
        with open(file_path, 'w') as file:
            file.write(modified_content)
        
        return f'Content modified in {file_path}. The preview should reload automatically.\n\nModified Content:\n{modified_content}'
    except Exception as e:
        return f'Error modifying content: {str(e)}'
