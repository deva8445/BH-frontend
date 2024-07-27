import { Dispatch, SetStateAction } from "react";

export interface IMultiSelectOptions {
  label: string;
  value: string;
}

export interface InputState {
  currentType: string;
}

export type InputAction = { type: "UPDATE_TYPE"; payload: string };

export interface InputFieldProps {
  label?: string;
  hideLabel?: boolean;
  inputName: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  type: string;
  customStyle?: string;
  onChange?: (value: any) => void;
  onClick?: (value: any) => void;
  value?: any;
  multiSelectOptions?: IMultiSelectOptions[];
  selectedOptions?: IMultiSelectOptions[];
  setSelectedOptions?: Dispatch<SetStateAction<IMultiSelectOptions[]>>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  isBorder?: boolean;
  maxLength?: number;
  minLength?: number;
  isError?: boolean;
  min?: string | number | undefined;
  max?: string | number;
  errorMessage?: string;
  handleChangeBoolean?: any;
  pattern?: string;
  title?: string;
  placeholder?: string;
  disableStyle?: boolean;
}
