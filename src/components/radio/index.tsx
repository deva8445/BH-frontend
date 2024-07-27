import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";

interface RadioOption {
  name: string;
  value: string;
}

interface RadioButtonComponentProps {
  options: RadioOption[];
  onSelectionChange: (selectedOption: RadioOption) => void;
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  options,
  onSelectionChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    options[0]?.value || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    const selectedOption = options.find((option) => option.value === newValue);

    if (selectedOption) {
      onSelectionChange(selectedOption);
    }
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="options"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonComponent;
