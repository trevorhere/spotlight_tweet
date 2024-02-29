require('dotenv').config();
const { createTweet } = require('./twitter')
const TWEET = process?.argv.slice(2, process.argv?.length).join('%2');

sendTweet = async (tweet) => {
  await createTweet(tweet)
}

sendTweet(TWEET)