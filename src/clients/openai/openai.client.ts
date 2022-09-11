import axios from 'axios';
import type { ModerateTextApiResponse, Results } from './openai.dto';

class OpenAIClient {
  private bearerToken: string;
  constructor(bearerToken: string | undefined) {
    if (!bearerToken) {
      throw new Error('Missing bearer token for OpenAI client');
    }
    this.bearerToken = bearerToken;
  }

  public async getModeratedTextResults(
    text: string | string[]
  ): Promise<Results | void> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.bearerToken}`,
    };

    const moderationData = await axios.post<ModerateTextApiResponse>(
      'https://api.openai.com/v1/moderations',
      { input: text },
      { headers }
    );
    return moderationData.data.results;
  }
}
export default new OpenAIClient(process.env.OPENAI_BEARER_TOKEN);
