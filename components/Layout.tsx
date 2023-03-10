import React, {
  ReactNode,
  useState,
  useEffect,
  MouseEvent,
  createContext,
} from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

export type SessionContextType = {
  email: string;
  signIn: (email: string) => void;
  logOut: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const SessionContext = createContext<SessionContextType>({
  email: '',
  signIn: null,
  logOut: null,
});

const Layout: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getCookie = async () => {
      const cookie = await Cookies.get('session');
      if (cookie && !email.length) {
        setEmail(cookie);
      }
    };
    getCookie();
  }, [email]);

  const signIn = (email: string) => {
    setEmail(email);
    Cookies.set('session', email);
  };

  const logOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmail('');
    Cookies.remove('session');
  };

  return (
    <>
      <div className='layout'>
        <SessionContext.Provider value={{ email, signIn, logOut }}>
          <link rel='stylesheet' href='https://use.typekit.net/wws8ddz.css' />
          <div className='layout'>
            <Navbar />
            {props.children}
          </div>
        </SessionContext.Provider>
        <footer>Thanks for visitng.</footer>
      </div>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Layout;
