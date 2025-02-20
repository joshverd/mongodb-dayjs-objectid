'use client';

import { useState, useMemo } from 'react';
import style from './page.module.scss';
import dayjs from 'dayjs';
import ObjectId from 'bson-objectid';

// Components
import ExpressionInput from './_components/ExpressionInput/ExpressionInput';

const Home = () => {
  const [time, setTime] = useState(dayjs());
  const [error, setError] = useState<string | null>(null);

  const objectID = useMemo(() => {
    const timestamp = time.valueOf();
    const objectID = new ObjectId(Math.floor(timestamp / 1000));

    return objectID.toString();
  }, [time]);

  const handleTimeChange = (newTime: dayjs.Dayjs) => {
    setTime(newTime);
  };

  const handleError = (newError: string | null) => {
    setError(newError);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(objectID);

    // Save the timestamp to local storage in an array for later use
    const timestamps = JSON.parse(localStorage.getItem('timestamps') || '[]');
    
    timestamps.unshift(time.valueOf());
    
    // Only keep the last 5 items
    if (timestamps.length > 5) {
      timestamps.splice(5);
    }

    localStorage.setItem('timestamps', JSON.stringify(timestamps));
  };

  return (
    <main className={style.main}>
      <div className={style.contentWrapper}>
        <ExpressionInput onTimeChange={handleTimeChange} onError={handleError} />
        {!error && (
          <>
            <button className={style.objectID} onClick={copyToClipboard}>{objectID}</button>
            <div className={style.time}>{time.format('MMMM D, YYYY [at] h:mm:ss A')}</div>
          </>
        )}
        {error && <div className={style.error}>{error}</div>}
        {/*TODO: Add a list of timestamps*/}
      </div>
    </main>
  );
};

export default Home;
