import {bg, colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setBg} from '@store/slices/userSlice';
import {Screen} from '@ui';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type ProfileProps = {
  closeWindow: (...ars: any) => any;
};

export const BackgroundScreen: React.FC<ProfileProps> = ({closeWindow}) => {
  const background = useAppSelector(state => state.user.bg);
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const setBgHandler = async (index: number) => {
    await dispatch(setBg(index));
    await AsyncStorage.setItem('bg', index.toString());
  };

  return (
    <Animated.View style={{flex: 1, transform: [{scale}]}}>
      <Screen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...styles.container, backgroundColor}}>
          {Object.values(bg).map((item: any, i) => (
            <TouchableOpacity
              onPress={() => setBgHandler(i + 1)}
              activeOpacity={0.7}
              key={i}
              style={styles.bgItem}>
              <ImageBackground style={styles.bg} source={item}>
                {i + 1 === background && (
                  <View style={styles.checkmarkContainer}>
                    <View style={styles.checkmark}>
                      <Icon
                        name="color-palette-outline"
                        color={colors.white}
                        size={30}
                      />
                    </View>
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          ))}
          <View style={{marginBottom: 20}} />
        </ScrollView>
      </Screen>
    </Animated.View>
  );
};
