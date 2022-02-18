import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import {Button, FormInput, ImagePicker} from '@ui';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';
import {submitStorySchema} from '..';

export const SubmitStoryForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [storyHeight, setStoryHeight] = useState(0);
  const [answerHeight, setAnswerHeight] = useState(0);
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
            leftIcon={{name: 'add', type: 'ionicons', color: 'gray'}}
            plaseholder="Title"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            errorMessage={errors.title}
            isTouched={touched.title}
          />
          <FormInput
            value={values.story}
            leftIcon={{name: 'help-outline', type: 'ionicons', color: 'gray'}}
            plaseholder="Story"
            onChangeText={handleChange('story')}
            onBlur={handleBlur('story')}
            onContentSizeChange={event => {
              setStoryHeight(event.nativeEvent.contentSize.height);
            }}
            height={storyHeight}
            errorMessage={errors.story}
            isTouched={touched.story}
            multiline={true}
          />
          <FormInput
            value={values.answer}
            leftIcon={{
              name: 'star-outline',
              type: 'ionicons',
              color: 'gray',
            }}
            plaseholder="Answer"
            onChangeText={handleChange('answer')}
            onBlur={handleBlur('answer')}
            onContentSizeChange={event => {
              setAnswerHeight(event.nativeEvent.contentSize.height);
            }}
            height={answerHeight}
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
