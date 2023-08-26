import React from 'react';
import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  FormWrapper,
  Button,
  LabelForm,
  ErrorMessageForm,
  FieldForm,
} from './FormPhonebook.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Phone number is required'),
});

const FormPhonebook = () => {
  const dispatch = useDispatch();
  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormWrapper>
        <LabelForm htmlFor={inputNameId}>Name</LabelForm>
        <FieldForm type="text" name="name" id={inputNameId} required />
        <ErrorMessageForm name="name" component="p" className="error" />
        <LabelForm htmlFor={inputNumberId}>Number</LabelForm>
        <FieldForm type="tel" name="number" id={inputNumberId} required />
        <ErrorMessageForm name="number" component="p" className="error" />
        <Button type="submit">Add contact</Button>
      </FormWrapper>
    </Formik>
  );
};

export default FormPhonebook;
