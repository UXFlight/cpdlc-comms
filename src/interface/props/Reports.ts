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
}

export interface ReportSectionProps {
  title?: string;
  rows: ReportRowProps[];
}
