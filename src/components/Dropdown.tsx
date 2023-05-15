import { Suggestion } from '../@types';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  q: string;
  suggestions: Suggestion[];
  children: React.ReactNode;
}

const Dropdown = ({ q, suggestions, children }: DropdownProps) => {
  return (
    <ul className="dropdown">
      {suggestions.map((suggestion) => (
        <DropdownItem key={suggestion} q={q}>
          {suggestion}
        </DropdownItem>
      ))}
      {children}
    </ul>
  );
};

export default Dropdown;
