import {t} from 'i18next';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(t('schemas:emailFormat'))
    .required(t('schemas:emailRequired')),
  password: yup.string().required(t('schemas:passwordRequired')),
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required(t('schemas:nameRequired'))
    .max(50, t('schemas:max50'))
    .min(2, t('schemas:min2'))
    .matches(/^[а-яA-яa-zA-Z-\s]*$/, t('schemas:nameMatches')),
  email: yup
    .string()
    .email(t('schemas:emailFormat'))
    .required(t('schemas:emailRequired'))
    .max(64, t('schemas:max64')),
  password: yup
    .string()
    .min(6, t('schemas:min6'))
    .max(32, t('schemas:max32'))
    .required(t('schemas:passwordRequired')),
});

export const reportSchema = yup.object().shape({
  name: yup
    .string()
    .required(t('schemas:nameRequired'))
    .max(50, t('schemas:max50'))
    .min(2, t('schemas:min2'))
    .matches(/^[а-яA-яa-zA-Z-\s]*$/, t('schemas:nameMatches')),
  email: yup
    .string()
    .email(t('schemas:emailFormat'))
    .required(t('schemas:emailRequired'))
    .max(64, t('schemas:max64')),
  message: yup
    .string()
    .min(5, t('schemas:min5'))
    .max(500, t('schemas:max500'))
    .required(t('schemas:messageRequired')),
});

export const editUserSchema = yup.object().shape({
  name: yup
    .string()
    .required(t('schemas:nameRequired'))
    .max(50, t('schemas:max50'))
    .min(2, t('schemas:min2'))
    .matches(/^[а-яA-яa-zA-Z-\s]*$/, t('schemas:nameMatches')),
  email: yup
    .string()
    .email(t('schemas:emailFormat'))
    .required(t('schemas:emailRequired'))
    .max(64, t('schemas:max64')),
});

export const submitStorySchema = yup.object().shape({
  title: yup
    .string()
    .required(t('schemas:titleRequired'))
    .max(50, t('schemas:max50'))
    .min(5, t('schemas:min5'))
    .matches(/^[а-яA-яa-zA-Z-\s]*$/, t('schemas:nameMatches')),
  story: yup
    .string()
    .required(t('schemas:storyRequired'))
    .max(500, t('schemas:max500'))
    .min(5, t('schemas:min5')),
  answer: yup
    .string()
    .required(t('schemas:answerRequired'))
    .max(500, t('schemas:max500'))
    .min(5, t('schemas:min5')),
});
