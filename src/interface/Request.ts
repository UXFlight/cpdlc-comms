export type Request = {
  messageRef: string | null;
  arguments: string[];
  formattedMessage?: string;
  timeSelected?: { hh: string; mm: string } | null;
  positionSelected?: string;
  additional?: string[];
};
