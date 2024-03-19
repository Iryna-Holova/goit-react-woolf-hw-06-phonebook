import { useSelector } from 'react-redux';
import { getFilter } from 'store/selectors';

const HighlightSearchResult = ({ text }) => {
  const { value } = useSelector(getFilter);

  const regex = new RegExp(`(${value})`, 'gi');
  const parts = text.split(regex);
  const highlightedText = parts.map((part, index) => {
    return part.match(regex) ? <b key={index}>{part}</b> : part;
  });

  return <span>{highlightedText}</span>;
};

export default HighlightSearchResult;
