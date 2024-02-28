const { createTweet } = require('./twitter')
require('dotenv').config();

module.exports.handler = async (event) => {
  try {
    await createTweet('test')
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'worked?',
        }
      ),
    };
  } catch (error) {
    console.log({ error })

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'there was an error'
      })
    }
  }

};
