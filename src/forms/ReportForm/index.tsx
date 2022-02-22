import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import {Button, FormInput, ImagePicker} from '@ui';
import {reportSchema} from '../schemas';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

export const ReportForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const {name, email} = useAppSelector(state => state.user);

  const [image, setImage] = useState<any>(null);

  const addImage = (image: any) => {
    setImage(image[0]);
  };

  return (
    <Formik
      validationSchema={reportSchema}
      initialValues={{name, email, message: ''}}
      onSubmit={values => onSubmit({...values, image})}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <FormInput
            value={values.name}
            leftIcon={{name: 'person', type: 'ionicons', color: 'gray'}}
            plaseholder="Your Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            errorMessage={errors.name}
            isTouched={touched.name}
          />
          <FormInput
            value={values.email}
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder="Your Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorMessage={errors.email}
            isTouched={touched.email}
          />
          <FormInput
            value={values.message}
            plaseholder="Your Message"
            onChangeText={handleChange('message')}
            onBlur={handleBlur('message')}
            numberOfLines={6}
            textAlignVertical="top"
            inputStyle={{alignItems: 'flex-start'}}
            errorMessage={errors.message}
            isTouched={touched.message}
            multiline={true}
          />

          <View style={styles.pickerContainer}>
            <ImagePicker
              image={image ? image.uri : null}
              style={{marginBottom: 0}}
              onImage={addImage}
            />
          </View>
          <Button
            onPress={handleSubmit}
            title="Send"
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
