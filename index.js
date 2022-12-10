const { Telegraf } = require("telegraf");
const commandParts = require("telegraf-command-parts");
const Axios = require("axios").default;
require("dotenv").config();
const bot = new Telegraf(process.env.TOKEN);
bot.use(commandParts());
async function fetchWeather(city, ctx) {
  const text = city[0].toUpperCase() + city.slice(1);

  await Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&APPID=46a5f1f15caefb45e9b1f9c2d3687e57`
  )
    .then((data) => {
      const temp = data.data.main.temp;
      ctx.reply(
        "🌦 Bugun " + text + "da ob-havo: " + data.data.main.temp + " C"
      );
      if (temp <= 10) {
        ctx.reply("Issiq kiyinib oling!🥶");
      } else if (temp > 10 && temp < 20) {
        ctx.reply("Ob havo iliq!😉");
      } else {
        ctx.reply("Havo issiq! 😉");
      }
    })
    .catch((err) => ctx.reply("Afsus Shahar topilmadi: " + err.code));
}
bot.start((ctx) =>
  ctx.reply(
    "Salom, Ob havoni bilish uchun  /get Shahar yoki davlat nomi: /get Termez   deb kiriting. Xato bo'lsa @Sanjarbek_Ismatov"
  )
);
bot.command("/get", (ctx) => {
  fetchWeather(ctx.state.command.args, ctx);
});

bot.launch();
