import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

type MyTextFieldProps = TextFieldProps & {
    name: string;
    control: any;
};

const FormInputText = (props: MyTextFieldProps) => {
    const { name, control, ...textFieldProps } = props;

    return <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
            <TextField value={value} onChange={onChange} {...textFieldProps} />
        )}
    />
};

export default FormInputText;