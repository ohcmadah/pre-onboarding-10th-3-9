import { Suggestion } from '../@types';

interface DropdownItemProps {
  q: string;
  onClickItem: (suggestion: Suggestion) => void;
  children: string;
}

const DropdownItem = ({ q, onClickItem, children: suggestion }: DropdownItemProps) => {
  const keywordRegex = new RegExp(`(${q})`, 'gi');
  const texts = suggestion.split(keywordRegex);
  return (
    <li className="item-container">
      <button type="button" className="dropdown-item" onClick={() => onClickItem(suggestion)}>
        {texts.map((text, idx) => {
          const key = text + idx;
          if (keywordRegex.test(text)) {
            return (
              <span key={key} className="text same">
                {text}
              </span>
            );
          }
          return (
            <span key={key} className="text">
              {text}
            </span>
          );
        })}
      </button>
    </li>
  );
};

export default DropdownItem;
