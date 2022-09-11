import {
  getUserByUsername,
  getLatestRootTweetByUserId,
  getRepliesFromRootTweet,
} from '../../services/twitter.services';

import type { Request, Response } from 'express';

// there is too much logic in this endpoint / controller
// ideally, if I had more time and skill on the frontend side,
// I'd create multiple endpoints for each "check"
// ... like does twitter user exist endpoint, get root tweets endpont etc
export async function moderatedReplies(req: Request, res: Response) {
  const { twitterHandler, moderationThreshold } = req.body;
  const twitterUsername = await getUserByUsername(twitterHandler);
  if (!twitterUsername) {
    return res
      .status(400)
      .send({ error: `No Twitter username found with "${twitterHandler}"` });
  }

  const latestRootTweet = await getLatestRootTweetByUserId(twitterUsername.id);
  if (!latestRootTweet) {
    return res.status(400).send({
      error: `Twitter user ${twitterHandler} has no public root / parent tweets`,
    });
  }

  const replies = await getRepliesFromRootTweet(latestRootTweet.id);

  res.status(200).send(replies);
}
