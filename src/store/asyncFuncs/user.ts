import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');

    if (token && id) {
      return {token, id};
    } else {
      return {token: null, id: null};
    }
  } catch (e) {}
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
  } catch (e) {}
});
