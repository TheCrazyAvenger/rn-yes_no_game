import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

import {styles} from './styles';
import {LottieProps} from '@ui';
import {useAppSelector} from '@hooks';
import {colors} from '@constants';

export const Loading: React.FC<LottieProps> = ({
  onAnimationFinish,
  style,
  isActive,
}) => {
  const animation: any = useRef(null);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  useEffect(() => {
    if (isActive) {
      animation.current!.play();
    } else {
      animation.current!.loop = false;
    }
  }, [isActive]);

  return (
    <LottieView
      style={{...styles.container, backgroundColor, ...style}}
      onAnimationFinish={onAnimationFinish}
      source={require('@assets/images/loading.json')}
      autoPlay={false}
      loop={true}
      ref={animation}
    />
  );
};
