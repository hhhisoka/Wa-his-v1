

const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
╔═══════════════════════╗
🌍 *Weather in ${data.name}, ${data.sys.country}* 🌍
╚═══════════════════════╝

🌡️ *Température Actuelle* : ${data.main.temp}°C  
🥵 *Ressenti*             : ${data.main.feels_like}°C  
📉 *Temp. Min*            : ${data.main.temp_min}°C  
📈 *Temp. Max*            : ${data.main.temp_max}°C  
💧 *Humidité*             : ${data.main.humidity}%  
☁️ *Conditions*           : ${data.weather[0].main}  
🌫️ *Description*          : ${data.weather[0].description}  
💨 *Vent*                 : ${data.wind.speed} m/s  
🔽 *Pression*             : ${data.main.pressure} hPa  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});
