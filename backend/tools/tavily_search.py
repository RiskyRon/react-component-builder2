import os
import logging
from tavily import TavilyClient
from langchain.agents import tool
from langgraph.prebuilt import ToolExecutor    

@tool
def tavily_search(query: str):
    """Search the web using the Tavily API."""
    logging.debug("Executing tavily_search with query: %s", query)
    api_key = os.environ["TAVILY_API_KEY"]
    tavily = TavilyClient(api_key=api_key)
    response = tavily.search(query=query, search_depth="basic", max_results=5)
    logging.debug("Tavily API response: %s", response)
    return response


