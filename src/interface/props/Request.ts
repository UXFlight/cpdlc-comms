export interface RequestProps {
  onSend: () => void;
  disabled?: boolean;
}

export interface AdditionalMessagesProps {
  extraMessages: string[];
  selected: string[];
  onChange: (val: string) => void;
}

export interface RequestContainerProps {
  requestType: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  showSendButton?: boolean;
  onSend?: () => void;
  children: React.ReactNode;
}
