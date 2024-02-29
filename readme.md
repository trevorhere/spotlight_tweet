
#### Description:

This app enables a user to send tweets from the spotlight toolbar using (Alfred)[https://www.alfredapp.com].

### Setup:

To set up in alfred, create a new work flow where a 'run script' object is triggered by a 'keyword' object.
In my case I use the keywords 'new tweet' which triggers the aforementioned script. 

Here is the script code:

```
#!/bin/zsh

# The first argument ($1) is the text entered after the keyword
tweet=$1

cd ~/dev/spotlight_tweet && node index.js "$1"
```

Additionally, you will need to create an .env file in the root folder of the project with the following values:


```
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
ACCESS_TOKEN
ACCESS_TOKEN_SECRET
```

These four values can be retrieved in the X developer [platform](https://developer.twitter.com)
