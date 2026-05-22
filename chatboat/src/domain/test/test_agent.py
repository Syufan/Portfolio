import asyncio
from unittest.mock import MagicMock, patch

from src.domain.openai_client import OpenAIClient

def test_agent_send_message():
    with patch("src.domain.openai_client.AsyncOpenAI") as mock_openai:
        mock_chunk = MagicMock()
        mock_chunk.choices[0].delta.content = "Hello"

        async def mock_create(*args, **kwargs):
            async def async_stream():
                yield mock_chunk
            return async_stream()

        mock_openai.return_value.chat.completions.create = mock_create

        agent = OpenAIClient()

        async def run():
            return [chunk async for chunk in agent.send_message("What are your skills?", "some fake data", [])]

        result = asyncio.run(run())
        assert result == ["Hello"]
