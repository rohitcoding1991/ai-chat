"use server";

import { openai } from "@/services/openai";

const formatMessage = (userInput: string) => ({
  role: "user",
  content: userInput,
});

export default async function addPrompt(history: any, prompt: any) {
  const initialPrompt = {
    role: "system",
    content: "You are a helpful assistant.",
  };

  console.log("calling the openai api");
  try {
    const completion = await openai.chat.completions.create({
      messages: [initialPrompt, ...history, formatMessage(prompt)],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message;
  } catch (err) {
    console.log(err, "error is here!")
    return null;
  }
}
