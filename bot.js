const TelegramBot = require('node-telegram-bot-api');
var entorno = require('./utilitys/config-modules.js').config();
const bot = new TelegramBot(entorno.key, {polling:true});
const wordController = require("./Controllers/AddWordFobidden.js");
const filter = require("./Controllers/FilterWords.js");
var logger = require("./utilitys/logs").log();
bot.on('polling_error', function(error){
    console.log(error);
});
bot.onText(/^\/addWord (.+)/, function(msg){
    var chatId = msg.chat.id;
    const resp = msg.text.split(' ')[1];

    wordController.AddWord(resp, function (message) {
        console.log(message);
        bot.sendMessage(chatId, message);
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const resp = msg.text;
    //console.log(msg);
    filter.Filter(resp, function (message) {
        bot.deleteMessage(chatId, msg.message_id, form = {});
    });
});
bot.on('channel_post', (msg) => {
    const chatId = msg.chat.id;
    const resp = msg.text;
    filter.Filter(resp, function (message) {
        bot.deleteMessage(chatId, msg.message_id, form = {});
    });
});