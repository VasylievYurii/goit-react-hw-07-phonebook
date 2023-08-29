import FormPhonebook from 'components/FormPhonebook';
import Contact from 'components/ContactCard/ContactCard';
import Filter from 'components/Filter';
import { useEffect } from 'react';
import {
  Section,
  Container,
  Title,
  TitleContacts,
  DiPhonegapSvg,
} from './App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getIsLoading, getError } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section>
        <Container>
          <Title>
            <DiPhonegapSvg />
            Phonebook
          </Title>
          <FormPhonebook />
          {isLoading && !error && <b>Request in progress...</b>}
          {contacts.length === 0 ? null : (
            <>
              <TitleContacts>Contacts</TitleContacts>
              <Filter />
              <Contact />
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
