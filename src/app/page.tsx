'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ObjectId from 'bson-objectid';
import style from './page.module.scss';

// Import the UTC plugin for Dayjs.
dayjs.extend(utc);

export default function Home() {
  const [ inputValue, setInputValue ] = useState('');
  const [ time, setTime ] = useState(dayjs());

  const [ error, setError ] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const objectID = useMemo(() => {
    if(inputValue === '') return '';

    const timestamp = time.valueOf();
    const objectID = new ObjectId(Math.floor(timestamp / 1000));

    return objectID.toString();
  }, [
    time,
  ]);

  const handleInputChange = (event: any) => {
    let value = event.target.value;

    // If there is not a period at the start of the input, add one.
    if (value.length > 0 && value[0] !== '.') value = `.${value}`;

    setInputValue(value);

    // Attempt to parse the input as a Dayjs time. If successful, convert to ObjectId.
    try {
      const evalValue = `window.dayjs().utc()${value}`;

      console.log(evalValue);

      const time = dayjs(eval(evalValue));

      if (time.isValid()) setTime(time);

      setError(null);
    } catch (error) {
      setError('Invalid input');
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
    <main className={style.main}>
      <div className={style.contentWrapper}>
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
        {inputValue.length > 0 && (
          <>
            <div className={style.objectId}>{error ?? objectID}</div>
            <div className={style.time}>{error ?? time.format('MMMM D, YYYY [at] h:mm:ss A')}</div>
          </>
        )}
      </div>
    </main>
  );
}
