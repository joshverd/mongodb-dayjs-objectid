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

  return (
    <main className={style.main}>
      <div className={style.contentWrapper}>
        <ExpressionInput onTimeChange={handleTimeChange} onError={handleError} />
        {!error && (
          <>
            <div className={style.objectId}>{objectID}</div>
            <div className={style.time}>{time.format('MMMM D, YYYY [at] h:mm:ss A')}</div>
          </>
        )}
        {error && <div className={style.error}>{error}</div>}
      </div>
    </main>
  );
};

export default Home;
