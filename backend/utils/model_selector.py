# backend/utils/model_selector.py
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

def get_model(model_id):
    if model_id == "gpt-3.5-turbo":
        return ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    elif model_id == "gpt-4-turbo":
        return ChatOpenAI(model="gpt-4-turbo", temperature=0)
    elif model_id == "gpt-4o-2024-05-13":
        return ChatOpenAI(model="gpt-4o-2024-05-13", temperature=0)
    elif model_id == "claude-3-haiku":
        return ChatAnthropic(model="claude-3-haiku-20240307", temperature=0)
    elif model_id == "claude-3-sonnet":
        return ChatAnthropic(model="claude-3-sonnet-20240229", temperature=0)
    elif model_id == "claude-3-opus":
        return ChatAnthropic(model="claude-3-opus-20240229", temperature=0)
    elif model_id == "mixtral-8x7b":
        return ChatGroq(model="mixtral-8x7b-32768", temperature=0)
    elif model_id == "llama3-70b-8192":
        return ChatGroq(model="llama3-70b-8192", temperature=0)
    else:
        raise ValueError(f"Unknown model ID: {model_id}")