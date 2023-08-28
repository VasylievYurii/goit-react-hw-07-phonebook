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
import { getContacts } from 'redux/selectors';
import { fetchContacts } from 'services/mockApi';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

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
