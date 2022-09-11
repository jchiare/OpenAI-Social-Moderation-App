import TwitterApi, { TweetV2, UserV2 } from 'twitter-api-v2';

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

export async function getUserByUsername(
  username: string
): Promise<UserV2 | null> {
  const twitterUser = await twitterClient.v2.userByUsername(username);
  return twitterUser?.data;
}

// since there is no property in the V2 API
// to determine if a tweet is root / parent or not
function _filterRootTweets(tweet: TweetV2): boolean {
  return !tweet.in_reply_to_user_id && !tweet.text.startsWith('RT @');
}

export async function getLatestRootTweetByUserId(
  userId: string
): Promise<TweetV2 | null> {
  const tweets = await twitterClient.v2.search(`from:${userId}`, {
    'tweet.fields': 'in_reply_to_user_id',
  });
  const rootTweets = tweets.data.data?.filter(_filterRootTweets);
  return rootTweets?.[0];
}

export async function getRepliesFromRootTweet(
  rootTweetId: string,
  maxResults = 50
): Promise<TweetV2[]> {
  const replies = await twitterClient.v2.search(
    `in_reply_to_tweet_id:${rootTweetId}`,
    {
      max_results: maxResults,
    }
  );
  return replies.data.data;
}
