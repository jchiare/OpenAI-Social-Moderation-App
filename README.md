# OpenAI Social Moderation App

Shield Social Media users from harmful messages

## Purpose

Social media has lots of positives and negatives. Some of the most prominent negative aspects are the harmful messages that are not constructive to the conversation or initial post.

We want to enable users to not view the messages that are considered harmful on their Social Media, starting with the replies to their most recent tweet.

## Moderation Details

We use OpenAI's [New-and-Improved Content Moderation Tooling](https://openai.com/blog/new-and-improved-content-moderation-tooling/) to predict how harmful messages are based on the following categories:

- hate
- hate/threatening
- self-harm
- sexual
- sexual/minors
- violence
- violence/graphic

## High Level Implementation

##### On the webpage, we ask the user for:

1. A Twitter username
2. Their tolerance for viewing potentially harmful replies to a tweet

##### On the backend, we use:

Twitter's V2 API to:

- Get a user by their username
- Return their most recent tweet (not reply or re-tweet)
- Get up to 50 replies to the tweet

OpenAI's moderation endpoint to:

- Classify the text of the replies against the Moderation Details
- Hide the reply if it's content moderation classification is below the tolerance level provided by the user

## Technical Implementation
