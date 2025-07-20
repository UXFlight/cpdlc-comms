export interface ReportRowProps {
  label: string;
  value: string;
  select?: boolean;
  options?: string[];
}

export interface ReportsContainerProps {
  children: React.ReactNode;
  label: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSend: () => void;
  onClear: () => void;
  disabled?: boolean;
  showSendButton?: boolean;
}

export interface ReportSectionProps {
  title?: string;
  rows: ReportRowProps[];
}

export interface ReportsInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputType?: string;
  maxLength?: number;
}

export interface SectionProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    disabled: boolean;
    onSend: () => void;
    cancelSign: number;
}