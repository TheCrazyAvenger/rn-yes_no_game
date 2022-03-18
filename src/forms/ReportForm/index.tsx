import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';

import {Button, FormInput, ImagePicker} from '@ui';
import {reportSchema} from '../schemas';
import {LoginFormProps} from '../PropTypes';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {colors} from '@constants';
import {t} from 'i18next';

export const ReportForm: React.FC<LoginFormProps> = ({onSubmit}) => {
  const {name, email, darkTheme} = useAppSelector(state => state.user);

  const backgroundColor = darkTheme ? colors.white : colors.darkBlue;
  const color = darkTheme ? colors.darkBlue : colors.white;

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
            inputStyle={styles.inputStyle}
            leftIcon={{name: 'person', type: 'ionicons', color: 'gray'}}
            plaseholder={t('common:name')}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            errorMessage={errors.name}
            isTouched={touched.name}
          />
          <FormInput
            value={values.email}
            inputStyle={styles.inputStyle}
            leftIcon={{name: 'mail', type: 'ionicons', color: 'gray'}}
            plaseholder={t('common:email')}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorMessage={errors.email}
            isTouched={touched.email}
          />
          <FormInput
            value={values.message}
            plaseholder={t('common:message')}
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
            title={t('common:send')}
            style={{...styles.submitButton, backgroundColor}}
            textStyle={{fontSize: 18, color}}
          />
        </View>
      )}
    </Formik>
  );
};
