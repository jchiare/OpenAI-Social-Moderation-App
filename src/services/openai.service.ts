import openAIClient from '../clients/openai/openai.client';
import type { TweetV2 } from 'twitter-api-v2';
import type { Results } from 'src/clients/openai/openai.dto';

// exporting a private function
// only for testing purposes
export function _getRepliesBelowModerationThreshold(
  textList: string[],
  moderationResults: Results,
  moderationThreshold: number
) {
  let repliesBelowModerationThreshold = [];

  for (const [index, moderation] of moderationResults.entries()) {
    let shouldAddReply = true;
    if (moderation.flagged) {
      continue; // immediately skip this text if it's flagged
    }

    // go through each moderation category
    for (const category in moderation.category_scores) {
      const parsedModerationScore = parseInt(
        (moderation.category_scores[category] * 100)?.toFixed(),
        10
      );

      // exit loop if any moderation score is above threshold
      if (parsedModerationScore > moderationThreshold) {
        shouldAddReply = false;
        break;
      }
    }
    if (shouldAddReply) {
      repliesBelowModerationThreshold.push(textList[index]);
    }
  }
  return repliesBelowModerationThreshold;
}

export async function getTwitterRepliesBelowModerationThreshold(
  replies: TweetV2[],
  moderationThreshold: number
) {
  const textList = replies.map((reply) => reply.text);
  const moderationResults = await openAIClient.getModeratedTextResults(
    textList
  );

  const repliesBelowModerationThreshold = _getRepliesBelowModerationThreshold(
    textList,
    moderationResults,
    moderationThreshold
  );

  return repliesBelowModerationThreshold;
}
