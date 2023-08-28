import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64e9acdfbf99bdcc8e66e154.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      console.log('response fetch:', response.data);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/create',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', data);
      console.log('response create:', response.data);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    console.log('id:', id);
    try {
      const response = await axios.delete(`/contacts/${id}`);
      console.log('response delete:', response.data);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
