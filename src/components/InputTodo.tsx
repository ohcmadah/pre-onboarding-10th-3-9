import { useEffect, useMemo, useState } from 'react';

import debounce from '../utils/debounce';
import useFocus from '../hooks/useFocus';
import useSuggestions from '../hooks/useSuggestions';
import { Suggestion, Todo } from '../@types';
import Dropdown from './Dropdown';

const DEBOUNCE_TIME = 500;
const INITIAL_PAGE_NUM = 1;

interface InputTodoProps {
  addTodo: (title: Todo['title']) => void;
  disabled: boolean;
}

const InputTodo = ({ addTodo, disabled }: InputTodoProps) => {
  const [inputText, setInputText] = useState('');
  const [page, setPage] = useState(INITIAL_PAGE_NUM);
  const { isLoading: isSearching, suggestions, hasMore } = useSuggestions(inputText, page);
  const [isTyping, setIsTyping] = useState(false);
  const { ref, setFocus } = useFocus<HTMLInputElement>();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const stopTyping = useMemo(() => debounce(() => setIsTyping(false), DEBOUNCE_TIME), [debounce]);
  const detectUserTyping = () => {
    setIsTyping(true);
    stopTyping();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText('');
    addTodo(inputText);
  };

  const onClickSuggestion = (suggestion: Suggestion) => {
    setInputText('');
    addTodo(suggestion);
  };

  const handleMore = () => setPage((prev) => prev + 1);

  return (
    <form
      className={['form-container', isSearching ? 'searching' : '', isTyping ? 'typing' : ''].join(
        ' ',
      )}
      onSubmit={onSubmit}
    >
      <div className="icon icon-search" />

      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={detectUserTyping}
        disabled={disabled}
      />

      {!hasMore && isSearching && <div className="icon icon-loading" />}

      {suggestions.length !== 0 && (
        <Dropdown q={inputText} suggestions={suggestions} onClickItem={onClickSuggestion}>
          {hasMore &&
            (isSearching ? (
              <div className="more">
                <div className="icon icon-loading" />
              </div>
            ) : (
              <button type="button" className="more cursor-pointer" onClick={handleMore}>
                <div className="icon icon-more" />
              </button>
            ))}
        </Dropdown>
      )}
    </form>
  );
};

export default InputTodo;
