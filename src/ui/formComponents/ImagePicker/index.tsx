import {ImagePickerProps} from '@ui';
import React from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const ImagePicker: React.FC<ImagePickerProps> = ({
  style,
  onImage,
  image,
}) => {
  const openGalleryHandler = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      onImage(result.assets);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableRipple
      style={[styles.container, style]}
      onPress={openGalleryHandler}>
      {image ? (
        <Image style={styles.image} source={{uri: image}} />
      ) : (
        <Icon name="camera" size={32} />
      )}
    </TouchableRipple>
  );
};
