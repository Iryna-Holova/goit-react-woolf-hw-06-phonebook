import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Section from './Section/Section';
import MainTitle from './MainTitle/MainTitle';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    const normalizedName = data.name.toLowerCase();
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (isExist) {
      throw new Error(`${data.name} is already in contacts.`);
    }
    setContacts(prevContacts => [{ ...data, id: nanoid() }, ...prevContacts]);
  };

  const handleRemoveContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const handleFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const handleFilterClear = () => {
    setFilter('');
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = filter ? filterContacts() : contacts;

  return (
    <>
      <Section>
        <MainTitle />
      </Section>
      <Section>
        <ContactForm onSubmit={handleAddContact} />
      </Section>
      <Section>
        <Filter
          value={filter}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
        />
      </Section>
      <Section
        title={filter ? `Results: ${filteredContacts.length}` : 'Contacts'}
      >
        <ContactList
          contacts={filteredContacts}
          onRemove={handleRemoveContact}
          filter={filter}
        />
      </Section>
    </>
  );
};

export default App;
