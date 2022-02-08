import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

import {styles} from './styles';
import {LottieProps} from '@ui';

export const Success: React.FC<LottieProps> = ({
  onAnimationFinish,
  style,
  isActive,
}) => {
  const animation: any = useRef(null);

  useEffect(() => {
    if (isActive) {
      animation.current!.play();
    } else {
      animation.current!.loop = false;
    }
  }, [isActive]);

  return (
    <LottieView
      style={{...styles.container, ...style}}
      onAnimationFinish={onAnimationFinish}
      source={require('@assets/images/success.json')}
      autoPlay={false}
      loop={false}
      ref={animation}
    />
  );
};
