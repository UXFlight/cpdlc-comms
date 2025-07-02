export type Request = {
  messageRef: string | null;
  arguments: string[] | null;
  formattedMessage?: string;
  timeSelected?: { hh: string; mm: string } | null;
  positionSelected?: string;
  additional?: string[];
};
