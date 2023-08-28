import FormPhonebook from 'components/FormPhonebook';
import Contact from 'components/ContactCard/ContactCard';
import Filter from 'components/Filter';
import {
  Section,
  Container,
  Title,
  TitleContacts,
  DiPhonegapSvg,
} from './App.styled';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export function App() {
  const contacts = useSelector(getContacts);
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
