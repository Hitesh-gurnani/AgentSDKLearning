import { Agent , run , tool } from "@openai/agents";
import { OpenAI } from "openai";
import 'dotenv/config';
import { z } from "zod";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);


const getWeatherTool = tool({
  name: "getWeather",
  description: "Get the weather of a city by its name",
  parameters: z.object({
    city: z.string().describe("The city to get the weather of"),
  }),
  execute: async (city) => {
    console.log(city);
    const response = await axios.get(`https:wttr.in/${city?.city?.toLowerCase()}?format=j1`);
    console.log(response.data);
    return response.data;
  },
});

const sendEmailTool = tool({
  name: "sendEmail",
  description: "Send an email with weather information to the preferred recipient",
  parameters: z.object({
    subject: z.string().describe("The subject of the email"),
    body: z.string().describe("The body of the email"),
  }),
  execute: async ({ subject, body }) => {
    const PREFERRED_EMAIL = "newidhiteshgurnani@gmail.com";
    const { data, error } = await resend.emails.send({
      from: 'Weather Agent <onboarding@resend.dev>',
      to: PREFERRED_EMAIL,
      subject,
      text: body,
    });
    if (error) return `Failed to send email: ${error.message}`;
    return "Email sent successfully";
  },
});

const helloAgent = new Agent({
    name: "Hello Agent",
    instructions: 'You are an expert in the field of weather. You can get the weather of a city and send weather information via email when requested.',
    tools: [getWeatherTool, sendEmailTool],
});

async function main(query) {
  const result = await run(helloAgent, query);
  console.log("Tool calls:", result.toolCalls); 
  console.log("Final output:", result.finalOutput);
}

main("What is the weather in Delhi today? and send it to my email");