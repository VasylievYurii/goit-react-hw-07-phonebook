import { createSlice } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { contactsInitialState } from './initialState';
import { fetchContacts, createContact, deleteContact } from 'services/mockApi';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [createContact.pending](state, action) {
      state.isLoading = true;
    },
    [createContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;

      const normalizedNameFilter = action.payload.name.toLowerCase();
      const isFoundName = !state.items.find(contact =>
        contact.name.toLowerCase().includes(normalizedNameFilter)
      );
      const isFoundPhone = !state.items.find(contact =>
        contact.phone.includes(action.payload.phone)
      );
      const isFound = isFoundName && isFoundPhone;

      if (isFound) {
        state.items.push(action.payload);
      } else {
        Notiflix.Notify.failure(
          `This contact is already in your contact list.`
        );
      }
    },
    [createContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContact.pending](state, action) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      console.log('state.error:', state.error);
      // state.items = state.items.filter(contact => {
      //   console.log('contact:', contact.id);
      //   console.log('action.payload', action.payload);
      //   return contact.id !== action.payload;
      // });
      console.log('action.payload', action.payload);
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      console.log('index:', index);
      state.items.splice(index, 1);
      console.log('state:', state.items);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
