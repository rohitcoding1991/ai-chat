// import { useCallback } from "react";
// import { toast } from "sonner";
// import { useCompletion } from "ai/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useWatch } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "../ui/button";
// import { Form, FormControl, FormField, FormItem } from "../ui/form";
// import { Input } from "../ui/input";
// import { useChatStore } from "@/store/ChatStore";
// import addPrompt from "@/app/actions/addPromptGroq";
// import { setLocalStorage } from "@/lib/local-stroage";
// // import addPrompt from "@/app/actions/addPrompt";

// const formSchema = z.object({
//   prompt: z.string().min(2).max(100),
// });

// export default function ChatInput() {
//   const { history, addHistory, addResponse } = useChatStore();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const text = useWatch({
//     control: form.control,
//     name: "prompt",
//     defaultValue: "",
//   });

//   const {
//     completion,
//     input,
//     isLoading,
//     handleInputChange,
//     handleSubmit,
//     setInput,
//   } = useCompletion({
//     body: { text },
//     onFinish: (prompt, completion) => setText(completion.trim()),
//     onError: (error) => toast(error.message),
//   });

//   const onSubmit = useCallback(
//     async (values: z.infer<typeof formSchema>) => {
//       addHistory(values.prompt);
//       const res = await addPrompt(history, values.prompt);
//       if (res) {
//         form.reset();
//         addResponse(res?.role as string, res?.content as string);
//         setLocalStorage("chatHistory", [
//           ...history,
//           {
//             role: "user",
//             content: values.prompt,
//           },
//           res,
//         ]);
//         /**
//          * To set the input on focus after the response
//          */
//         setTimeout(() => {
//           form.setFocus("prompt");
//         }, 50);
//       }
//     },
//     [history]
//   );

//   return (
//     <Form {...form}>
//       <form
//         className="h-full items-center flex gap-4"
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <div className="flex-1 h-full flex items-center">
//           <FormField
//             control={form.control}
//             disabled={form.formState.isSubmitting}
//             name="prompt"
//             render={({ field }) => (
//               <FormItem className=" w-full">
//                 <FormControl>
//                   <Input placeholder="Enter your prompt" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="h-full flex items-center">
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// messages
// take last 2 messages and insert in the database
// [
//   {
//       "content": "What is react?",
//       "role": "user",
//       "createdAt": "2024-06-05T11:46:14.317Z",
//       "id": "8CZ5KSO"
//   },
//   {
//       "id": "nZMgWph",
//       "role": "assistant",
//       "content": "React is a free and open-source front-end JavaScript library for building user interfaces. It allows developers to create reusable UI components that can be composed together to create complex interfaces.",
//       "createdAt": "2024-06-05T11:46:14.861Z"
//   }
// ]

"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat, Message } from "ai/react";

import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatLine from "@/components/Chat/ChatLine";
import { createChat } from "@/actions/create-chat";
import { getMessagesByChatId } from "@/actions/get-messages-by-chatid";
import { useChatStore } from "@/store/ChatStore";
import OpenAIIcon from "@/icons/svg/open-ai.svg";
import Spinner from "@/components/Spinner";

function ChatInput() {
  const router = useRouter();
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  const fetchChats = useChatStore((state) => state.fetchChats);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const newChatInitiated = useRef(false);

  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    messages,
    setInput,
    setMessages,
  } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef, messages]);

  // listen to the isloading state and then either push the new chat to db or update the chat
  useEffect(() => {
    // the case of creating a new chat
    // save the chat into the database
    if (newChatInitiated.current && !isLoading) {
      createChat({
        chatId,
        title: messages[0].content,
        // send last 2 message array
        messages: messages.slice(-2),
      }).then((response) => {
        newChatInitiated.current = false;
        router.push(`/chat/${response.chat.id}`);
      });
    } else if (chatId && messages.length === 0 && !isLoading) {
      // load the messages for the chatId
      setFetchLoading(true);
      getMessagesByChatId({ chatId })
        .then((msgs) => {
          setMessages(msgs as Message[]);
          newChatInitiated.current = false;
        })
        .catch((error) => setError(error.message))
        .finally(() => setFetchLoading(false));
    } else if (!chatId && !isLoading) {
      setFetchLoading(false);
    }
  }, [isLoading, router, chatId]);

  useEffect(() => {
    // whenever there is chatId, or it changes in the url, refetch the chats
    if (chatId) {
      fetchChats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <div
      className="
        relative h-[calc(100vh_-_64px)]"
    >
      <div
        ref={scrollRef}
        className="h-[calc(100vh_-_64px_-_56px)] overflow-y-auto"
      >
        {fetchLoading ? (
          <div className="flex justify-center items-center h-full w-full">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="absolute top-0 left-0 bottom-0 right-0 z-[-1] flex justify-center items-center">
                <OpenAIIcon />
              </div>
            )}
            <div className="flex flex-col gap-10 pr-4 pb-8 px-2 pt-4">
              {messages.map((hist: Message, i) => (
                <ChatLine
                  key={hist.id + i}
                  id={hist.id + i}
                  role={hist.role}
                  content={hist.content}
                />
              ))}
            </div>
            {error && (
              <div className="flex justify-center items-center h-[70vh]">
                <p>{error}</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4 bg-white h-[56px] absolute bottom-0 w-full">
        <form
          className="h-full items-center flex gap-4"
          onSubmit={(...allParams) => {
            newChatInitiated.current = true;
            handleSubmit(...allParams);
          }}
        >
          <div className="h-full flex items-center w-full">
            <FormItem className=" w-full">
              <Input
                placeholder="Enter your prompt"
                value={input}
                onChange={handleInputChange}
              />
            </FormItem>
          </div>
          <div className="h-full flex items-center">
            <Button disabled={isLoading} type="submit">
              {!isLoading ? (
                "Submit"
              ) : (
                <>
                  <Spinner
                    width="20px"
                    height="20px"
                    borderWidth="3px"
                    borderColor="white"
                    borderBottomColor="black"
                  />
                  <p className="ml-2"> Submitting....</p>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
