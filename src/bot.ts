import { Bot } from "grammy";
import { BOT_TOKEN } from "./config";
import { startHandler } from "./handlers/start";
import { languageHandler } from "./handlers/language";

const bot = new Bot(BOT_TOKEN);

// Command /start dengan auto-detect bot username
bot.command("start", async (ctx) => startHandler(ctx, bot));

// Handle pilihan bahasa
bot.callbackQuery(/.*/, languageHandler);

// Jalankan bot
bot.start();
console.log("🤖 Bot is running...");
