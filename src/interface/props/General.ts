export interface CharacterInputProps {
  name?: string;
  value: string;
  length: number;
  style?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
}

export interface CustomCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface RadioProps {
  label: string | React.ReactNode;
  value: string;
  selected: string;
  onChange: (val: string) => void;
}

export interface PositionInputProps {
  disabled?: boolean;
  selected: boolean;
  onToggle: () => void;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  style?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export interface SendButtonProps {
  onSend: () => void;
}

export interface SendAtInputProps {
  disabled?: boolean;
  positionSelected: boolean;
  onTogglePosition: () => void;
  position: string;
  onChangePosition: (val: string) => void;
  timeSelected: boolean;
  onToggleTime: () => void;
  time: { hh: string; mm: string };
  onChangeTime: (hh: string, mm: string) => void;
}

export interface TimeInputProps {
  disabled?: boolean;
  selected: boolean;
  onToggle: () => void;
  hh: string;
  mm: string;
  onChange: (hh: string, mm: string) => void;
}
