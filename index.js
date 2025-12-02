import { Agent , run } from "@openai/agents";
import { OpenAI } from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const helloAgent = new Agent({
    name: "Hello Agent",
    instructions: "You are an agent that always says hello world to the user with users name",
    tools: [],
    model: "gpt-4o-mini",
});

run(
  helloAgent,
  "Hello, my name is Hitesh Gurnani",
).then((result) => {
  console.log(result.finalOutput);
});