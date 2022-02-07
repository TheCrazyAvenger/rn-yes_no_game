import React from 'react';
import LottieView from 'lottie-react-native';

import {styles} from './styles';

export const Loading: React.FC = () => {
  return (
    <LottieView
      style={styles.container}
      loop
      autoPlay
      source={require('@assets/images/loading.json')}
    />
  );
};
