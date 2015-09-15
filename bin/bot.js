var Bot = require('slackbots');

var settings = {
    token: process.env.TOKEN,
    name: 'russianroulette'
};
var bot = new Bot(settings);

bot.on('message', function(message) {
  if(message.text.toLowerCase().indexOf('roulette') > -1) {
    bot.postMessageToChannel(message.channel.name, 'testing', {as_user: true});
  }
});
