const { Telegraf } = require("telegraf");
const commandParts = require("telegraf-command-parts");
const Axios = require("axios").default;
require("dotenv").config();
const bot = new Telegraf(process.env.TOKEN);
bot.use(commandParts());
async function fetchWeather(city, ctx) {
  await Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=46a5f1f15caefb45e9b1f9c2d3687e57`
  )
    .then((data) => {
      ctx.reply(data.data.main.temp);
    })
    .catch((err) => ctx.reply("Afsus Shahar topilmadi: " + err.code));
}
bot.start((ctx) => ctx.reply("Salom"));
bot.command("/get", (ctx) => {
  fetchWeather(ctx.state.command.args, ctx);
});
bot.launch();
