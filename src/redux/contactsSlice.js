import { createSlice } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { contactsInitialState } from './initialState';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;

        const normalizedNameFilter = payload.name.toLowerCase();
        const isFoundName = !state.items.find(contact =>
          contact.name.toLowerCase().includes(normalizedNameFilter)
        );
        const isFoundPhone = !state.items.find(contact =>
          contact.phone.includes(payload.phone)
        );
        const isFound = isFoundName && isFoundPhone;

        if (isFound) {
          state.items.unshift(payload);
        } else {
          Notiflix.Notify.failure(
            `This contact is already in your contact list.`
          );
        }
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
