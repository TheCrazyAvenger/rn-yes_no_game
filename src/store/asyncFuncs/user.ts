import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const image = await AsyncStorage.getItem('image');
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');

    if (name && email && image && id && token) {
      return {name, email, image, id, token};
    } else {
      return {name: null, email: null, image: null, id: null, token: null};
    }
  } catch (e) {}
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('image');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('token');
  } catch (e) {}
});
