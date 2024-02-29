
this is an app which enables a user to send tweets from the spotlight toolbar using alfred.

to set up in alfred, create a new work flow where a 'run script' object is triggered by a 'keyword' object.

in my case i use the key words 'new tweet' which triggers the aforementioned script. 

here is the script code:

```
#!/bin/zsh

# The first argument ($1) is the text entered after the keyword
tweet=$1

cd ~/dev/spotlight_tweet && node index.js "$1"
```