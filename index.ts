import { Telegraf } from "telegraf";
import axios from "axios";
import { config } from "dotenv";
import { TelegrafContext } from "telegraf/typings/context";
config();
const bot = new Telegraf(process.env.TOKEN || "");
type TelegrafContextWithCommandParts = TelegrafContext & {
  state: { command: { args: string } };
};
bot.use(require("telegraf-command-parts")());

async function fetchWeather(
  city: string,
  ctx: TelegrafContextWithCommandParts
) {
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=46a5f1f15caefb45e9b1f9c2d3687e57`
    )
    .then((data) => {
      ctx.reply(
        "🌦 Bugun " + city + "da ob-havo: " + data.data.main.temp + " C"
      );
    })
    .catch((err) => ctx.reply("Afsus Shahar topilmadi: " + err.code));
}
bot.start((ctx) =>
  ctx.reply(
    "Salom, Ob havoni bilish uchun  /get Shahar yoki davlat nomi: /get Termez   deb kiriting. Xato bo'lsa @Sanjarbek_Ismatov"
  )
);
bot.command("/get", (ctx: any) => {
  fetchWeather(ctx.state.command.args, ctx);
});

bot.launch();
