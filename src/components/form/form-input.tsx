// Resuable form input component with formfield

import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  control: Control<any>;
  disabled?: boolean;
}

export const FormInput = ({
  label,
  name,
  type,
  placeholder,
  required,
  control,
  disabled,
}: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
