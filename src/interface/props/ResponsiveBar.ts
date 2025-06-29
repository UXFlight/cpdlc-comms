export interface NavButtonProps {
  icon: string;
  label: string;
  id: string;
  active: boolean;
  onTabChange: (tab: string) => void;
}

export interface NavContainerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface ResponsiveBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
