from langchain.agents import tool
import os

@tool
def add_component_to_preview(content: str) -> str:
    """
    Saves the provided content to a hardcoded file path and triggers a preview reload.
    
    Args:
        content (str): The content to save.
    
    Returns:
        str: The content of the saved file.
    """
    file_path = '/Users/ron/Documents/projects/vite element highlighter/frontend/src/components/NewComponent.tsx'
    
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w') as file:
            file.write(content)
        
        with open(file_path, 'r') as file:
            saved_content = file.read()
        
        return f'Content saved to {file_path}. The preview should reload automatically.\n\nSaved Content:\n{saved_content}'
    except Exception as e:
        return f'Error saving content: {str(e)}'
