import React, { useEffect, useState } from 'react';
import './Checkbox.css';
import { FieldHookConfig, useField } from 'formik';
import {
  FormControl, FormControlLabel, FormHelperText, Checkbox,
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
  checked?: boolean
  defaultChecked?: boolean
}

const CheckboxInput: React.FC<FieldHookConfig<string> & ContainerProps> = ({
  fullWidth,
  label,
  color,
  variant,
  size,
  renderValue,
  readOnly,
  sx,
  margin,
  checked,
  defaultChecked,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [state, setState] = useState(false);

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
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={defaultChecked}
            checked={checked}
            size={size}
            color={color}
            {...field}
          />
        }
        label={label}
      />
      <FormHelperText>
        {meta.error && state ? meta.error : ''}
      </FormHelperText>
    </FormControl>

  );
};

CheckboxInput.defaultProps = {
  color: 'light',
  variant: 'outlined',
  fullWidth: true,
  size: 'medium',
  margin: 'normal',
  sx: { minWidth: 80 },
};

export default CheckboxInput;
