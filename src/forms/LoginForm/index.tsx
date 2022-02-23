import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';

import {Button, FormInput} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {loginSchema} from '../schemas';
import {styles} from './styles';
import {t} from 'i18next';

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={values => onSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <FormInput
            value={values.email}
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder={t('common:name')}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorMessage={errors.email}
            isTouched={touched.email}
          />
          <FormInput
            value={values.password}
            leftIcon={{name: 'lock', type: 'ionicons', color: 'gray'}}
            secureTextEntry={true}
            keyboardType="email-address"
            plaseholder={t('auth:password')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={errors.password}
            isTouched={touched.password}
          />
          <Button
            onPress={handleSubmit}
            title={t('auth:signin')}
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
