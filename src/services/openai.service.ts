import openAIClient from '../clients/openai/openai.client';
import type { TweetV2 } from 'twitter-api-v2';

export async function getModResultsFromTwitterReplies(reply: TweetV2[]) {
  const text = reply.map((reply) => reply.text);
  const moderationResults = await openAIClient.getModeratedTextResults(text);
  return moderationResults;
}
