import { Log } from "../../../interface/Logs";
import Message from "./Message";

type Props = {
  message: Log
};

export default function MessageDisplayTab({ message }: Props) {
  return (
    <div>
      <Message message={message} />
    </div>
  );
}
