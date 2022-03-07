const TelegramBot = require('node-telegram-bot-api');
var entorno = require('./utilitys/config-modules.js').config();
const bot = new TelegramBot(entorno.key, {polling:true});
const wordController = require("./Controllers/AddWordFobidden.js");
const helper = require("./Controllers/HelperController.js");
const filter = require("./Controllers/FilterWords.js");
var logger = require("./utilitys/logs").log();
bot.on('polling_error', function(error){
    logger.info(error);
});
bot.onText(/^\/addWord (.+)/, function(msg){
    var chatId = msg.chat.id;
    const resp = msg.text.split(' ')[1];

    wordController.AddWord(resp, function (message) {
        logger.info("Word added: "+resp);
        bot.sendMessage(chatId, message);
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const resp = msg.text;
    filter.Filter(resp, function (message) {
        logger.info("message banned: "+resp);
        bot.deleteMessage(chatId, msg.message_id, form = {});
    });
});
bot.on('channel_post', (msg) => {
    const chatId = msg.chat.id;
    const resp = msg.text;
    filter.Filter(resp, function (message) {
        logger.info("message banned: "+resp);
        bot.deleteMessage(chatId, msg.message_id, form = {});
    });
});

bot.onText(/^\/garkahelp/, function(msg){
    var chatId = msg.chat.id;
    const resp = msg.text;

    logger.info("helper: "+resp);
    helper.Helper(resp,function (mg,btn){
        bot.sendMessage(chatId, mg, btn);
    });

    bot.on('callback_query', function onCallbackQuery(action) {
        const data = action.data;
        const msg = action.message;
        helper.Helper(msg,function (mg,btn){
            bot.sendMessage(chatId, mg, btn);
        });
    });
});