// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
import { useField } from 'formik';
import { TextField } from '@mui/material';
import { ComponentProps } from 'react';

type AppFieldProps = {
    label: string;
    name: string;
    sx?: ComponentProps<typeof TextField>["sx"];
    multiline?: boolean;
  }

export const AppField: React.FC<AppFieldProps> = ({
    label,
    name,
    sx,
    multiline = false,
  }) => {
    const [field, meta] = useField(name);
    field.value = field.value || '';
  
    return (
      <TextField
        fullWidth
        variant="outlined"
        id={name}
        label={label}
        sx={sx}
        multiline={multiline}
        rows={multiline ? 5 : undefined}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        {...field}
      />
    );
  };