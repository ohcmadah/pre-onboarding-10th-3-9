import { useCallback, useEffect, useMemo, useState } from 'react';

import { createTodo } from '../api/todo';
import debounce from '../utils/debounce';
import useFocus from '../hooks/useFocus';
import useSuggestions from '../hooks/useSuggestions';
import { Todo } from '../@types';
import Dropdown from './Dropdown';

const DEBOUNCE_TIME = 500;
const INITIAL_PAGE_NUM = 1;

interface InputTodoProps {
  addTodo: (newTodo: Todo) => void;
}

const InputTodo = ({ addTodo }: InputTodoProps) => {
  const [inputText, setInputText] = useState('');
  const [page, setPage] = useState(INITIAL_PAGE_NUM);
  const { isLoading: isSearching, suggestions, hasMore } = useSuggestions(inputText, page);

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsSubmitting(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const data = await createTodo(newItem);

        if (data) {
          return addTodo(data);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsSubmitting(false);
      }

      return undefined;
    },
    [inputText, addTodo],
  );

  const handleMore = () => setPage((prev) => prev + 1);

  return (
    <form
      className={['form-container', isSearching ? 'searching' : '', isTyping ? 'typing' : ''].join(
        ' ',
      )}
      onSubmit={handleSubmit}
    >
      <div className="icon icon-search" />

      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={detectUserTyping}
        disabled={isSubmitting}
      />

      {!hasMore && isSearching && <div className="icon icon-loading" />}

      {suggestions.length !== 0 && (
        <Dropdown q={inputText} suggestions={suggestions}>
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
