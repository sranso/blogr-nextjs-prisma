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
      <SessionContext.Provider value={{ email, signIn, logOut }}>
        <div className='layout'>
          <Navbar />
          {props.children}
        </div>
      </SessionContext.Provider>
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          background: rgba(0, 0, 0, 0.05);
        }

        input,
        textarea {
          font-size: 16px;
        }

        button {
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
};

export default Layout;
