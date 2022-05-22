import React, { useEffect, useState } from 'react';
import './TextInput.css';
import { FieldHookConfig, useField } from 'formik';
import TextField from '@mui/material/TextField/TextField';

interface ContainerProps {
  margin?: 'none' | 'dense' | 'normal' | undefined,
  multiline?: boolean,
  fullWidth?: boolean,
  minRows?: string,
  maxRows?: string,
  label?: string,
  color?: any
  variant?: 'outlined' | 'standard' | 'filled' | undefined,
  InputProps?: any,
  size?: 'small' | 'medium' | undefined,
  hiddenLabel?: boolean
}

const TextInput: React.FC<FieldHookConfig<string> & ContainerProps> = ({
  label,
  color,
  margin,
  children,
  variant,
  minRows,
  maxRows,
  multiline,
  fullWidth,
  InputProps,
  size,
  hiddenLabel,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [state, setState] = useState('');

  useEffect(() => {
    if (meta.error && meta.touched) setState('danger');
    else setState('');
  }, [meta.error, field.value]);

  return (
    <TextField
      hiddenLabel={hiddenLabel}
      fullWidth={fullWidth}
      id={props.id}
      margin={margin}
      label={label}
      minRows={minRows}
      maxRows={maxRows}
      variant={variant}
      type={props.type}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete}
      size={size}
      multiline={multiline}
      required={props.required}
      InputProps={InputProps}
      disabled={props.disabled}
      color={color}
      error={state === 'danger'}
      helperText={meta.error && state === 'danger' ? meta.error : ''}
      {...field}
    />
  );
};

TextInput.defaultProps = {
  color: 'light',
  variant: 'outlined',
  fullWidth: true,
  multiline: false,
  margin: 'normal',
  size: 'medium',
};

export default TextInput;
