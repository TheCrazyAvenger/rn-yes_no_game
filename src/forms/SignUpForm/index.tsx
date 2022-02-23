import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';

import {Button, FormInput} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {signupSchema} from '../schemas';
import {styles} from './styles';
import {t} from 'i18next';

export const SignUpForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  return (
    <Formik
      validationSchema={signupSchema}
      initialValues={{name: '', email: '', password: ''}}
      onSubmit={values => onSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <FormInput
            value={values.name}
            leftIcon={{name: 'person', type: 'ionicons', color: 'gray'}}
            plaseholder={t('common:name')}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            errorMessage={errors.name}
            isTouched={touched.name}
          />
          <FormInput
            value={values.email}
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder={t('common:email')}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorMessage={errors.email}
            isTouched={touched.email}
          />
          <FormInput
            value={values.password}
            leftIcon={{name: 'lock', type: 'ionicons', color: 'gray'}}
            secureTextEntry={true}
            plaseholder={t('auth:password')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={errors.password}
            isTouched={touched.password}
          />
          <Button
            onPress={handleSubmit}
            title={t('auth:signup')}
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
