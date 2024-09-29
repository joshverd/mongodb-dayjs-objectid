'use client';

import { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import style from './ExpressionInput.module.scss';

dayjs.extend(utc);

interface ExpressionInputProps {
  onTimeChange: (time: dayjs.Dayjs) => void;
  onError: (error: string | null) => void;
}

const ExpressionInput = ({ onTimeChange, onError }: ExpressionInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length > 0 && value[0] !== '.') value = `.${value}`;

    setInputValue(value);

    try {
      const evalValue = `window.dayjs().utc()${value}`;

      const time = dayjs(eval(evalValue));

      if (time.isValid()) {
        onTimeChange(time);
        onError(null);
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={style.inputWrapper}>
      <span>dayjs.utc()</span>
      <input
        type="text"
        className={style.input}
        value={inputValue}
        onChange={handleInputChange}
        placeholder=".add(1, 'day')"
        ref={inputRef}
      />
    </div>
  );
};

export default ExpressionInput;
