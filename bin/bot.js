var Bot = require('slackbots');
var _ = require('lodash');

var settings = {
    token: process.env.TOKEN,
    name: 'russianroulette'
};
var bot = new Bot(settings);

var usersList = ["aaron", "alytxu", "arturo", "carlos", "chema", "cynthia", "dgrijuela", "diana", "fuzzyalej", "jose", "juan", "julian", "linkrbot", "luis", "luisherrero", "miguel", "migueldelmazo", "roman", "russianroulette", "sara", "traductor", "werelax"];

var isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text);
};

var isChannelConversation = function (message) {
  return typeof message.channel === 'string' &&
    message.channel[0] === 'C';
};

var isMentioningRussianRoulette = function (message) {
  return message.text.toLowerCase().indexOf('roulette') > -1 ||
    message.text.toLowerCase().indexOf(bot.name) > -1;
};

var replyWithRussianRoulette = function (message) {
  var chosenOne = _.sample(usersList);
  var targetChannel;
  _.forEach(bot.channels, function(channel) {
    if(channel.id === message.channel) {
      targetChannel = channel.name;
    }
  });
  bot.postMessageToChannel(targetChannel, 'The choooooosen one has beeeeeeeen.... @' + chosenOne, {as_user: true});
};

bot.on('message', function(message) {
  if (isChatMessage(message) && isMentioningRussianRoulette(message)) {
    replyWithRussianRoulette(message);
  }
});
