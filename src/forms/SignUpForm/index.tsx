import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';

import {Button, FormInput} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {signupSchema} from '../schemas';
import {styles} from './styles';

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
            plaseholder="Your Nickname"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            errorMessage={errors.name}
            isTouched={touched.name}
          />
          <FormInput
            value={values.email}
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder="Your Email"
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
            plaseholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorMessage={errors.password}
            isTouched={touched.password}
          />
          <Button
            onPress={handleSubmit}
            title="Sign Up"
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
