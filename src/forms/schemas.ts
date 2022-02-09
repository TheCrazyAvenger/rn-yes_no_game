import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email')
    .max(64, 'This field should be less than or equal to 64 symbols'),
  password: yup
    .string()
    .min(6, 'This field should contain at least 6 symbols')
    .max(32, 'This field should be less than or equal to 32 symbols')
    .required('Please enter your password'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(1).max(12).label('Name'),
  email: yup.string().email().required().min(1).label('Email'),
  password: yup.string().required().min(5).max(16).label('Password'),
});
