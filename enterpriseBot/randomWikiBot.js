const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6278390062:AAFt1UXrh9Si-yEz-nLlLCBVG8CuY9s3ql8';
const chatId = '-958504447';

const bot = new TelegramBot(token);

async function getMessage() {
    try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'random',
                rnnamespace: 0,
                rnlimit: 1,
            },
        });

        if (response.data && response.data.query && response.data.query.random) {
            const title = response.data.query.random[0].title;
            return title;
        }

        throw new Error('Failed to fetch random Wikipedia article.');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getSummary(title) {
    try {
        const response = await axios.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title));

        if (response.data && response.data.extract) {
            const summary = response.data.extract;
            return summary;
        }

        throw new Error('Failed to fetch Wikipedia article summary.');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function postMessage() {
    try {
        const title = await getMessage();
        const summary = await getSummary(title);

        const message = `*${title}*\n\n${summary}`;

        // Send the message to the Telegram group
        bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error(error);
    }
}

postMessage();