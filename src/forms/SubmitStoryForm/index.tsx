import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import {Button, FormInput, ImagePicker} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';
import {submitStorySchema} from '..';

export const SubmitStoryForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [image, setImage] = useState<any>(null);

  const addImage = (image: any) => {
    setImage(image[0]);
  };

  return (
    <Formik
      validationSchema={submitStorySchema}
      initialValues={{title: '', story: '', answer: ''}}
      onSubmit={(values, {resetForm}) => {
        onSubmit({...values, image});
        resetForm();
        setImage(null);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <View style={styles.pickerContainer}>
            <ImagePicker
              image={image ? image.uri : null}
              style={styles.picker}
              onImage={addImage}
            />
          </View>
          <FormInput
            value={values.title}
            plaseholder="Title"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            errorMessage={errors.title}
            isTouched={touched.title}
          />
          <FormInput
            value={values.story}
            plaseholder="Story"
            onChangeText={handleChange('story')}
            onBlur={handleBlur('story')}
            numberOfLines={5}
            textAlignVertical="top"
            errorMessage={errors.story}
            isTouched={touched.story}
            multiline={true}
          />
          <FormInput
            value={values.answer}
            plaseholder="Answer"
            onChangeText={handleChange('answer')}
            onBlur={handleBlur('answer')}
            numberOfLines={5}
            textAlignVertical="top"
            errorMessage={errors.answer}
            isTouched={touched.answer}
            multiline={true}
          />

          <Button
            onPress={handleSubmit}
            disabled={errors && !image}
            title="Send"
            style={styles.submitButton}
          />
        </View>
      )}
    </Formik>
  );
};
