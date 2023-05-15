import { useCallback, useEffect, useMemo, useState } from 'react';

import { createTodo } from '../api/todo';
import debounce from '../utils/debounce';
import useFocus from '../hooks/useFocus';
import { getSuggestions } from '../api/search';
import { Suggestion, Todo } from '../@types';

const DEBOUNCE_TIME = 500;

interface InputTodoProps {
  addTodo: (newTodo: Todo) => void;
}

const InputTodo = ({ addTodo }: InputTodoProps) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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

  useEffect(() => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return undefined;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const debounced = debounce(async () => {
      const data = await getSuggestions({ params: { q: trimmed, page: 1, limit: 10 }, signal });
      setSuggestions(data.result);
    }, 500);
    debounced();

    return () => {
      debounced.clear();
      controller.abort();
    };
  }, [inputText]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

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
        setIsLoading(false);
      }

      return undefined;
    },
    [inputText, addTodo],
  );

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
      {isSearching && <div className="icon icon-loading" />}
    </form>
  );
};

export default InputTodo;
