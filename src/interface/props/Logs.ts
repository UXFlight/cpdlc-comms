import { ActionType } from "@/constants/tabs/Logs";
import { Log } from "../Logs";

export interface MessageProps {
  message: Log;
}

export interface MessageContainerProps {
  messages: Log[];
}

export interface OptionBarProps {
  message: Log;
  actions: ActionType[];
}
