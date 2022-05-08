import React, { useEffect, useState } from 'react';
import './TextInput.css';
import {
  IonInput, IonItem, IonLabel,
} from '@ionic/react';

import { FieldHookConfig, useField } from 'formik';
import { AutocompleteTypes, getPlatforms, TextFieldTypes } from '@ionic/core';
import { useAppSelector } from '../../store/Hooks';

interface ContainerProps {
  label?: string;
  autocorrect?: string,
  autofocus?: boolean,
  autocomplete?: AutocompleteTypes | undefined,
  color?: string,
  inputmode?: any,
  placeholder?: string,
  readonly?: boolean,
  required?: boolean,
  size?: number,
  minlength?: number,
  type?: TextFieldTypes,
  multiple?: boolean,
  step?: any,
  enterkeyhint?: any,
  value: string,
  onChange?: (e: any) => any,
  onBlur?: (e: any) => any,
  onFocus?: (e: any) => any
}

const TextInput: React.FC<ContainerProps> = ({
  onChange,
  onBlur,
  onFocus,
  label,
  autocorrect,
  autofocus,
  autocomplete,
  color,
  inputmode,
  placeholder,
  readonly,
  required,
  size,
  minlength,
  type,
  enterkeyhint,
  multiple,
  step,
  value,
}) => {
  const [state, setState] = useState('');
  const [platformType, setPlatformType] = useState(undefined);
  const platform = useAppSelector((slice) => slice.user.platform) as any;

  useEffect(() => {
    console.log('input');
  }, []);

  return (
    <>
      <IonItem>
        {
          label
          && <IonLabel position="floating">{label}</IonLabel>
        }
        <IonInput
          onIonBlur={(e: any) => onBlur && onBlur(e.target)}
          onIonChange={(e: any) => onChange && onChange(e.target)}
          onIonFocus={(e: any) => onFocus && onFocus(e.target)}
          value={value}
          step={step}
          multiple={multiple}
          autocomplete={autocomplete}
          autoCorrect={autocorrect}
          autofocus={autofocus}
          color={color}
          inputmode={inputmode}
          minlength={minlength}
          placeholder={placeholder}
          readonly={readonly}
          required={required}
          size={size}
          type={type || platform}
          enterkeyhint={enterkeyhint}
        >
        </IonInput>
      </IonItem>
      {/* <div className="mtp-form-msg-wrapper">
        <p className='mtp-form-msg'>{meta.error && meta.touched ? meta.error : ''}</p>
      </div> */}
    </>

  );
};

TextInput.defaultProps = {
  autocorrect: 'off',
  autofocus: false,
  autocomplete: 'on',
  color: 'light',
  type: 'text',
  inputmode: undefined,
  placeholder: '',
  readonly: false,
  required: false,
  size: undefined,
  minlength: undefined,
  enterkeyhint: 'next',
  multiple: false,
};

export default TextInput;
