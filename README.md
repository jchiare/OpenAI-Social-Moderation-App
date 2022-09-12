# OpenAI Social Moderation App

Shield Social Media users from harmful messages

You can try it out here: https://starfish-app-ls8qg.ondigitalocean.app/

## Purpose

Social media has lots of positives and negatives. Some of the most prominent negative aspects are the harmful messages that are not constructive to the conversation or initial post.

We want to enable users to not view the messages that are considered harmful on their Social Media, starting with the replies to their most recent tweet.

Demo use: https://user-images.githubusercontent.com/17396900/189602892-6c390fa9-c7f2-4201-b19e-2565fcee51c7.mp4

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

#### On the webpage, we ask the user for:

1. A Twitter username
2. Their tolerance for viewing potentially harmful replies to a tweet

#### On the backend, we use:

.. Twitter's V2 API to:

- Get a user by their username
- Return their most recent tweet (not reply or re-tweet)
- Get up to 50 replies to the tweet

.. OpenAI's moderation endpoint to:

- Classify the content of the tweet's replies against the moderation endpoint
- Hide the reply if it's content moderation classification is above the tolerance level provided by the user

## Technical Implementation

- NodeJS / TypeScript on the backend (tested on node 14+)
- Basic HTML5/CSS/JS on the frontend

## Future Improvements

- [ ] Use a modern JS framework for the frontend
- [ ] Use a modern UI library for the frontend
- [ ] HTTP error handling for external services
- [ ] Decouple the controller logic of username searching / root tweet finding from the one endpoint (into multiple endpoints)
- [ ] Add pagination to Twitter's API calls
- [ ] Add more unit and integration tests on the backend
- [ ] Threshold slider works after the backend API call, not only at the time of the request
- [ ] Containerize the app (with Docker)
- [ ] Add CI/CD
- [ ] Cache the API responses
- [ ] Allow users to search by a specific tweet and not only the latest
      ... much more

### How to run

1. Clone the repo
2. Run `npm install` to install the depencencies
3. Run `npm run start` to start the application




