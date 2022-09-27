const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => ctx.reply("Salom"));
bot.on("text", (ctx) => {
  ctx.reply("Siz yozgan text: " + ctx.message.text);
});
bot.on("photo", (ctx) => {
  ctx.reply(ctx.message.photo);
});
bot.command("hello", (ctx) => ctx.reply("Salom zor"));
bot.launch();
