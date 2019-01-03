const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token:'xoxb-513934245794-513766490388-24YJIx0A6um65KjGhrvxSU67',
    name:'jokebot'
});

// Start Handler
bot.on('start',() => {
    const params = {
        icon_emoji: ':smiley:',
    }
    bot.postMessageToChannel('general',
    'Get Ready to Laugh with @Jokebot',
    params
    );
});

//Error Handler
bot.on('error', (err) => console.log());

//Message Handler
bot.on('message',(data) => {
    if (data.type !== 'message'){
        console.log("dbz")
        return;
    }
    handleMessage(data.text);
});

// Respond to Data
function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    }
}

// Tell a Chuck Norris Joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random/').then(res => {
        const joke = res.data.value.joke;
        const params = {icon_emoji: ':laughing:'};
        bot.postMessageToChannel('general',`Chuck Norris: ${joke}`,params);
    });
}