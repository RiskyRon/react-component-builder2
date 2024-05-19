# /Users/ron/Documents/projects/vite element highlighter/backend/utils/tool_list.py

#import tools here
from tools.add_component_to_preview import add_component_to_preview
from tools.tavily_search import tavily_search
from tools.modify_component import modify_component  # Import the new tool

tools = [add_component_to_preview, tavily_search, modify_component]  # Add the new tool to the list
