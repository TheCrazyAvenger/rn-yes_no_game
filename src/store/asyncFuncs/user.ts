import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const image = await AsyncStorage.getItem('image');

    if (name && email && image) {
      return {name, email, image};
    } else {
      return {name: null, email: null, image: null};
    }
  } catch (e) {}
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('image');
  } catch (e) {}
});
