import style from './page.module.scss';
import { cookies } from 'next/headers';

// Components
import ClientComponent from '@components/ClientComponent/ClientComponent';
import GithubLogo from '@components/GithubLogo/GithubLogo';

const COOKIE_NAME = 'objectid-dayjs-expressions';

export const runtime = 'edge';

const Home = () => {
  const initialDayjsExpressions = JSON.parse(cookies().get(COOKIE_NAME)?.value || '[]');

  return (
    <main className={style.main}>
      <ClientComponent initialDayjsExpressions={initialDayjsExpressions} />
      <a 
        target="_blank" 
        className={style.githubLinkWrapper} 
        href="https://github.com/joshverd/mongodb-dayjs-objectid"
      >
        <GithubLogo className={style.githubLogo} />
      </a>
    </main>
  );
};

export default Home;
