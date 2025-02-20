'use client';

import { useState, useMemo } from 'react';
import style from './ClientComponent.module.scss';
import dayjs from 'dayjs';
import ObjectId from 'bson-objectid';

// Components
import ExpressionInput from '../ExpressionInput/ExpressionInput';

const COOKIE_NAME = 'objectid-dayjs-expressions';

type ClientComponentProps = {
  initialDayjsExpressions: string[];
};

const ClientComponent = ({ initialDayjsExpressions }: ClientComponentProps) => {
  const [expression, setExpression] = useState('');
  const [time, setTime] = useState(dayjs());
  const [error, setError] = useState<string | null>(null);

  const [ dayjsExpressions, setDayjsExpressions ] = useState<string[]>(initialDayjsExpressions);

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

  const handleExpressionChange = (newExpression: string) => {
    setExpression(newExpression);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(objectID);

    // If the expression is empty, don't save it
    if(!expression) return;

    // Save the expression to cookies in an array for later use
    const expressions = JSON.parse(document.cookie.match(`(?:^|; )${COOKIE_NAME}=([^;]*)`) ? decodeURIComponent(RegExp.$1) : '[]');

    // Remove existing expression if it exists
    const existingIndex = expressions.indexOf(expression);

    if (existingIndex !== -1) {
      expressions.splice(existingIndex, 1);
    }

    expressions.unshift(expression);

    // Only keep the last 5 items
    if (expressions.length > 5) {
      expressions.splice(5);
    }

    setDayjsExpressions(expressions);

    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(expressions))}; path=/; max-age=31536000`;
  };

  return (
    <div className={style.contentWrapper}>
      <ExpressionInput
        onTimeChange={handleTimeChange}
        onError={handleError}
        onExpressionChange={handleExpressionChange}
        expression={expression}
      />
      {!error && (
        <>
          <button className={style.objectID} onClick={copyToClipboard}>{objectID}</button>
          <div className={style.time}>{time.format('MMMM D, YYYY [at] h:mm:ss A')}</div>
        </>
      )}
      {error && <div className={style.error}>{error}</div>}
      {dayjsExpressions.length > 0 && (
        <div className={style.expressions}>
          <h4>Previous Expressions</h4>
          {dayjsExpressions.map(expression => {
            return (
              <button 
                className={style.expression} 
                key={expression} 
                onClick={() => handleExpressionChange(expression)}
              >
                {expression}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientComponent;
