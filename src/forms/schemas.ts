import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your nickname')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
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

export const reportSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your nickname')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  email: yup
    .string()
    .email('Please check your email format')
    .required('Please enter your email')
    .max(64, 'This field should be less than or equal to 64 symbols'),
  message: yup
    .string()
    .min(5, 'This field should contain at least 5 symbols')
    .max(500, 'This field should be less than or equal to 500 symbols')
    .required('Please enter your message'),
});
