import { MessageProps } from "@/interface/props/Logs";
import Message from "./Message";

export default function MessageDisplayTab({ message }: MessageProps) {
  return (
    <div>
      <Message message={message} />
    </div>
  );
}
