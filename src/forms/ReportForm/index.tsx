import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import {Button, FormInput, ImagePicker} from '@ui';
import {reportSchema} from '../schemas';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';

export const ReportForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState<any>(null);

  const addImage = (image: any) => {
    setImage(image[0]);
  };

  return (
    <Formik
      validationSchema={reportSchema}
      initialValues={{name: '', email: '', message: ''}}
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
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder="Your Message"
            onChangeText={handleChange('message')}
            onBlur={handleBlur('message')}
            onContentSizeChange={event => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
            height={height}
            errorMessage={errors.message}
            isTouched={touched.message}
            multiline={true}
          />

          <ImagePicker
            image={image}
            style={{marginLeft: 10}}
            onImage={addImage}
          />

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
