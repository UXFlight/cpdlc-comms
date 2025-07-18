export interface RequestProps {
  onSend: () => void;
  onOpen: (isOpen: boolean) => void;
  disabled?: boolean;
  cancelSign?: number;
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

export interface BlockDataProps {
  label: string;
  from: string;
  setFrom: (value: string) => void;
  to: string;
  setTo: (value: string) => void;
  isOpen: boolean;
  disabled: boolean;
}

export interface MessagePreviewProps {
  onCancel: () => void;
  onSent: () => void;
}
