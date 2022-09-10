import TwitterApi from 'twitter-api-v2';
import axios from 'axios';

require('dotenv').config();

(async () => {
  const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

  const data = await appOnlyClient.v2.userByUsername('paulg');

  const tweets = await appOnlyClient.v2.search(`from:${data.data.id}`, {
    'tweet.fields': 'in_reply_to_user_id',
    max_results: 50,
  });
  const rootTweets = tweets.data.data.filter(
    (tweet) => !tweet.in_reply_to_user_id && !tweet.text.startsWith('RT @')
  );

  const replies = await appOnlyClient.v2.search(
    `in_reply_to_tweet_id:${rootTweets[0].id}`,
    {
      //max_results: 2,
    }
  );
  console.log(replies.data.data);

  const payload = {
    input: replies.data.data.map((reply) => reply.text),
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_BEARER_TOKEN}`,
  };
  const moderationData = await axios.post(
    'https://api.openai.com/v1/moderations',
    payload,
    { headers }
  );
  console.log(moderationData.data.results);
})();
