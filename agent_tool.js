import { Agent } from "@openai/agents";

const agent = new Agent({
    name: "Weather Agent",
    instructions: "You are a weather agent that can get the weather of a city",
    model: "gpt-4o-mini",
    tools: [getWeather],
});


async function getWeather(city) {
    
}