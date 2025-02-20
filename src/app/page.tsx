import style from './page.module.scss';
import { cookies } from 'next/headers';

// Components
import ClientComponent from './_components/ClientComponent/ClientComponent';

const COOKIE_NAME = 'objectid-dayjs-expressions';

export const runtime = 'edge';

const Home = () => {
  const initialDayjsExpressions = JSON.parse(cookies().get(COOKIE_NAME)?.value || '[]');

  return (
    <main className={style.main}>
      <ClientComponent initialDayjsExpressions={initialDayjsExpressions} />
    </main>
  );
};

export default Home;
