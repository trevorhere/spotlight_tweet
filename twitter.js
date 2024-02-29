require('dotenv').config();
const crypto = require('crypto');
const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const endpointURL = `https://api.twitter.com/2/tweets`;

module.exports.createTweet = async (text) => {
  const auth_headers = generateAuthHeaders();
  const tweet_content = generateTweetContent(text)

  return await fetch(
    endpointURL, {
    method: 'POST',
    headers: {
      Authorization: auth_headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tweet_content)
  })
    .then(response => response.json())
    .then(data => {
      console.log('res', data);
      return 'tweet posted';
    })
    .catch(error => {
      console.log({ error });
      return 'error posting tweet';
    });
}

const generateTweetContent = (text) => {
  return {
    "text": text
  };
}
const generateAuthHeaders = () => {
  const oauth = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    token: ACCESS_TOKEN,
    token_secret: ACCESS_TOKEN_SECRET
  };


  const oauth_data = {
    oauth_consumer_key: oauth.consumer_key,
    oauth_nonce: crypto.randomBytes(32).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_token: oauth.token,
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_version: '1.0'
  };

  const parameters = Object.keys(oauth_data)
    .sort().map(k => `${encodeURIComponent(k)}=${encodeURIComponent(oauth_data[k])}`).join('&');

  const signature = crypto
    .createHmac('sha1', `${encodeURIComponent(CONSUMER_SECRET)}&${encodeURIComponent(oauth.token_secret)}`)
    .update(`POST&${encodeURIComponent('https://api.twitter.com/2/tweets')}&${encodeURIComponent(parameters)}`)
    .digest('base64');

  oauth_data.oauth_signature = signature;

  const auth_headers = 'OAuth ' + Object.keys(oauth_data)
    .map(k => `${encodeURIComponent(k)}="${encodeURIComponent(oauth_data[k])}"`)
    .join(', ');

  return auth_headers
}