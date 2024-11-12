"use server";

import { streamText, StreamingTextResponse } from "ai";
import { groqOpenAI } from "@/services/groq-cloud";

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
    // const completion = await groq.chat.completions.create({
    //   messages: [initialPrompt, ...history, formatMessage(prompt)],
    //   model: "llama3-8b-8192",
    // });

    // console.log(completion, "completion");

    // console.log(
    //   JSON.stringify(completion.choices[0].message, null, 2),
    //   "message"
    // );

    // return completion.choices[0].message;

    // const completionStream = await groq.chat.completions.create({
    //   messages: [initialPrompt, ...history, formatMessage(prompt)],
    //   model: "llama3-8b-8192",
    //   stream: true,
    // });

    // const stream = OpenAIStream(completionStream);
    // return streamToResponse(stream);
    const result = await streamText({
      model: groqOpenAI("llama3-8b-8192"),
      system:
        "You are a text editor. You will be given a prompt and a text to edit, which may be empty or incomplete. Edit the text to match the prompt, and only respond with the full edited version of the text - do not include any other information, context, or explanation. If you add on to the text, respond with the full version, not just the new portion. Do not include the prompt or otherwise preface your response. Do not enclose the response in quotes.",
      prompt,
    });
    return new StreamingTextResponse(result.toAIStream());
  } catch (err) {
    console.log(err, "error is here!");
    return null;
  }
}
