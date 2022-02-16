import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {IMAGES_URL} from '@env';

import {Button, FormInput, ImagePicker} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {editUserSchema} from '..';

export const ProfileEditForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const {
    name,
    email,
    image: currentImage,
  } = useAppSelector(state => state.user);

  const [image, setImage] = useState<any>(null);

  const addImage = (image: any) => {
    setImage(image[0]);
  };

  const imageUri = useMemo(() => (image ? image.uri : currentImage), [image]);

  return (
    <Formik
      validationSchema={editUserSchema}
      initialValues={{name, email}}
      onSubmit={values => onSubmit({...values, image})}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <View style={{width: 80}}>
            <ImagePicker
              image={imageUri}
              style={{marginLeft: 10}}
              onImage={addImage}
            />
          </View>

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

          <Button
            onPress={handleSubmit}
            title="Save"
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
