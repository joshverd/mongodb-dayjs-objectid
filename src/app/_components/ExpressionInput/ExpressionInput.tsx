'use client';

import { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import style from './ExpressionInput.module.scss';

dayjs.extend(utc);

interface ExpressionInputProps {
  onTimeChange: (time: dayjs.Dayjs) => void;
  onError: (error: string | null) => void;
  onExpressionChange: (expression: string) => void;
  expression: string,
};

const ExpressionInput = ({ onTimeChange, onError, onExpressionChange, expression }: ExpressionInputProps) => {
  const [inputValue, setInputValue] = useState(expression);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    if (value.length > 0 && value[0] !== '.') value = `.${value}`;

    setInputValue(value);

    try {
      const evalValue = `window.dayjs().utc()${value}`;

      const time = dayjs(eval(evalValue));

      if (time.isValid()) {
        onTimeChange(time);
        onError(null);

        onExpressionChange(value);
      } else {
        onError('Invalid input');
      }
    } catch (error) {
      onError('Invalid input');
    }
  };

  useEffect(() => {
    // Set the window.dayjs variable to the Dayjs instance.
    // @ts-ignore
    window.dayjs = dayjs;
  }, []);

  useEffect(() => {
    handleInputChange(expression);
  }, [ expression ]);

  useEffect(() => {
    // Small delay to ensure DOM is ready and other effects have completed
    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const putCursorAtEnd = () => {
    if (inputRef.current) {
      console.log('Putting cursor at end');

      inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={style.inputWrapper}
      onClick={putCursorAtEnd}
    >
      <span>dayjs.utc()</span>
      <input
        type="text"
        className={style.input}
        value={inputValue}
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder=".add(1, 'day')"
        ref={inputRef}
      />
    </div>
  );
};

export default ExpressionInput;
