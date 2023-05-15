import { Suggestion } from '../@types';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  q: string;
  suggestions: Suggestion[];
  onClickItem: (suggestion: Suggestion) => void;
  children: React.ReactNode;
}

const Dropdown = ({ q, suggestions, onClickItem, children }: DropdownProps) => {
  return (
    <ul className="dropdown">
      {suggestions.map((suggestion) => (
        <DropdownItem key={suggestion} q={q} onClickItem={onClickItem}>
          {suggestion}
        </DropdownItem>
      ))}
      {children}
    </ul>
  );
};

export default Dropdown;
