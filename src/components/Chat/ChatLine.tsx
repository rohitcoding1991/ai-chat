import { Message } from "ai";
import RenderMd from "../Markdown/RenderMd";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ChatLineProps = Message;

export default function ChatLine({ role, content }: ChatLineProps) {
  const avatarSrc =
    role === "assistant" ? "/chatgptlogo.svg" : "/user-circle.svg";

  const roleName = role === "assistant" ? "Chatbot" : "User";

  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage className="h-8" src={avatarSrc} />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <div className=" flex-1 flex flex-col">
        <p className="font-bold capitalize">{roleName}</p>
        <RenderMd text={content} />
      </div>
    </div>
  );
}
