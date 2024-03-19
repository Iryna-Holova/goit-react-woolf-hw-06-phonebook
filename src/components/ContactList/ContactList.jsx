import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'store/selectors';
import { deleteContact } from 'store/contacts-slice';
import Section from 'components/Section/Section';
import ContactItem from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);
  const { value } = useSelector(getFilter);

  const filterContacts = () => {
    const normalizedFilter = value.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = value ? filterContacts() : contacts;

  return (
    <Section title={value ? `Results: ${filteredContacts.length}` : 'Contacts'}>
      <ul className={css.list}>
        {filteredContacts.map(({ id, ...contact }) => (
          <ContactItem
            key={id}
            onContactRemove={() => dispatch(deleteContact(id))}
            {...contact}
          />
        ))}
      </ul>
    </Section>
  );
};

export default ContactList;
