import { Bot } from "grammy";
import { BOT_TOKEN } from "./config/config";
import { startHandler } from "./handlers/start";
import { languageHandler } from "./handlers/language";
import { logger } from "./utils/logger"; // Import the logger

const bot = new Bot(BOT_TOKEN);

// Command /start with auto-detect bot username
bot.command("start", async (ctx) => {
    logger.info(`Received /start command from ${ctx.from?.id}`);
    await startHandler(ctx, bot);
});

// Handle language selection
bot.callbackQuery(/.*/, (ctx) => {
    logger.info(`Received language selection from ${ctx.from?.id}: ${ctx.match}`);
    languageHandler(ctx);
});

// Run the bot
bot.start().then(() => {
    logger.info("Bot started successfully.");
}).catch((error) => {
    logger.error(`Error starting bot: ${error.message}`);
});

console.log("🤖 Bot is running...");
