interface DropdownItemProps {
  q: string;
  children: string;
}

const DropdownItem = ({ q, children: suggestion }: DropdownItemProps) => {
  const keywordRegex = new RegExp(`(${q})`, 'gi');
  const texts = suggestion.split(keywordRegex);
  return (
    <li className="dropdown-item">
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
    </li>
  );
};

export default DropdownItem;
