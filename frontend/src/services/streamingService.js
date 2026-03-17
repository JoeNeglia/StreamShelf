// Purpose: Client wrapper for streaming API requests.
import axios from 'axios';

export async function fetchStreaming(provider, type = 'movie') {
  const params = new URLSearchParams({ provider, type });
  const { data } = await axios.get(`/api/streaming?${params.toString()}`);
  return data;
}
