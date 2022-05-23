import React, { useEffect, useState, useId } from 'react';
import './TextInput.css';
import { FieldHookConfig, useField } from 'formik';
import {
  FormControl, FormHelperText, InputLabel, Select,
} from '@mui/material';

interface ContainerProps {
  fullWidth?: boolean,
  label?: string,
  color?: any
  variant?: 'outlined' | 'standard' | 'filled' | undefined,
  size?: 'small' | 'medium' | undefined,
  renderValue?: any,
  readOnly?: boolean,
  sx?: any,
  margin?: 'none' | 'dense' | 'normal' | undefined,
}

const SelectInput: React.FC<FieldHookConfig<string> & ContainerProps> = ({
  fullWidth,
  label,
  color,
  variant,
  size,
  renderValue,
  readOnly,
  sx,
  margin,
  children,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [state, setState] = useState(false);
  const labelId = useId();

  useEffect(() => {
    if (meta.error && meta.touched) setState(true);
    else setState(false);
  }, [meta.error, field.value]);

  return (
    <FormControl
      fullWidth={fullWidth}
      variant={variant}
      disabled={props.disabled}
      required={props.required}
      margin={margin}
      error={state}
      sx={sx}
    >
      <InputLabel color={color} id={`${labelId}-${label}-label`}>{label}</InputLabel>
      <Select
        id={props.id}
        label={label}
        labelId={`${labelId}-${label}`}
        multiple
        type={props.type}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        size={size}
        color={color}
        inputProps={{ readOnly }}
        renderValue={(value) => `⚠️  - ${value}`}
        autoWidth={false}
        {...field}
      >
        {children}
      </Select>
      <FormHelperText>
        {meta.error && state ? meta.error : ''}
      </FormHelperText>
    </FormControl>

  );
};

SelectInput.defaultProps = {
  color: 'light',
  variant: 'outlined',
  fullWidth: true,
  size: 'medium',
  margin: 'normal',
  sx: { minWidth: 80 },
};

export default SelectInput;
