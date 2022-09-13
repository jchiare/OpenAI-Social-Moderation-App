import {
  getUserByUsername,
  getLatestRootTweetByUserId,
  getRepliesFromRootTweet,
} from '../services/twitter.services';
import { getTwitterRepliesBelowModerationThreshold } from '../services/openai.service';

import type { Request, Response } from 'express';

// there is too much logic in this endpoint / controller
// ideally, if I had more time and skill on the frontend side,
// I'd create multiple endpoints for each "check"
// ... like does twitter user exist endpoint, get root tweets endpoint etc
export async function moderatedReplies(req: Request, res: Response) {
  const { twitterHandle, moderationThreshold = 50 } = req.body;

  const twitterUsername = await getUserByUsername(twitterHandle);
  if (!twitterUsername) {
    const errMsg = `No Twitter username found with "${twitterHandle}"`;
    console.log(errMsg); // add server side error message for stats
    return res
      .status(400)
      .send({ error: `No Twitter username found with "${twitterHandle}"` });
  }

  const latestRootTweet = await getLatestRootTweetByUserId(twitterUsername.id);
  if (!latestRootTweet) {
    const errMsg = `Twitter user "${twitterHandle}" has no public root / parent tweets in their latest 50 tweets`;
    console.log(errMsg); // add server side error message for stats
    return res.status(400).send({
      error: errMsg,
    });
  }

  const replies = await getRepliesFromRootTweet(latestRootTweet.id);
  if (!replies) {
    return res.status(200).send({
      data: {
        twitterReplies: ['--- No replies to this tweet ---'],
        latestTweetId: latestRootTweet.id,
      },
    });
  }

  const twitterRepliesBelowModerationThreshold =
    await getTwitterRepliesBelowModerationThreshold(
      replies,
      moderationThreshold
    );

  res.status(200).send({
    data: {
      twitterReplies: twitterRepliesBelowModerationThreshold,
      latestTweetId: latestRootTweet.id,
    },
  });
}
