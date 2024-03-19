import { IconContext } from 'react-icons';
import { FaAddressBook } from 'react-icons/fa';
import css from './MainTitle.module.css';

const MainTitle = () => {
  return (
    <div className={css.wrapper}>
      <IconContext.Provider value={{ size: '32px' }}>
        <FaAddressBook />
      </IconContext.Provider>
      <h1>PhoneBook</h1>
    </div>
  );
};

export default MainTitle;
