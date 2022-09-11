const searchButton = document.getElementById('search-btn');
const twitterHandle = document.getElementById('twitter-handle');
const thresholdValue = document.getElementById('moderation-slider');
const rootTweet = document.getElementById('twitter-root-tweet');
const repliesDiv = document.getElementById('twitter-replies-section');
const tweetEmbedSection = document.getElementById('twitter-embed-section');

function createTwitterEmbed(tweetId) {
  const blockquote = createEl(undefined, 'blockquote', 'twitter-tweet');
  const tweetEmbedEl = createEl(undefined, 'a', undefined);

  const script = createEl(undefined, 'script', undefined);
  script.src = 'https://platform.twitter.com/widgets.js';
  script.charset = 'utf-8';

  tweetEmbedEl.href = `https://twitter.com/x/status/${tweetId}`;
  blockquote.appendChild(tweetEmbedEl);
  tweetEmbedSection.appendChild(blockquote);
  tweetEmbedSection.appendChild(script);
}

function createEl(text, elType, className) {
  const paragraph = document.createElement(elType);
  if (text) {
    const node = document.createTextNode(text);
    paragraph.appendChild(node);
  }
  if (className) {
    paragraph.className = className;
  }

  return paragraph;
}

function populateReplies(replies) {
  const repliesHeader = createEl(
    'Replies below moderation threshold',
    'h4',
    'reply-header'
  );
  repliesDiv.appendChild(repliesHeader);
  replies.map((reply) =>
    repliesDiv.appendChild(createEl(reply, 'p', 'twitter-reply'))
  );
}

searchButton.onclick = () => {
  searchButton.textContent = '...loading';
  // delete all visible replies
  while (repliesDiv.lastElementChild) {
    repliesDiv.removeChild(repliesDiv.lastElementChild);
  }
  // delete embed tweet
  while (tweetEmbedSection.lastElementChild) {
    tweetEmbedSection.removeChild(tweetEmbedSection.lastElementChild);
  }
  let responseData;
  fetch('http://localhost:3000/twitter/get-moderated-replies', {
    method: 'POST',
    body: JSON.stringify({
      twitterHandle: twitterHandle.value,
      moderationThreshold: thresholdValue.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        window.alert(`API error: ${data.error}`);
      } else {
        rootTweet.classList.add('show');
        populateReplies(data.data.twitterReplies);
        createTwitterEmbed(data.data.latestTweetId);
      }
      searchButton.textContent = 'Search';
    })
    .catch((err) => {
      window.alert('Error: ', JSON.stringify(err));
      searchButton.textContent = 'Error!!';
    });
};
