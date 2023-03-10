import React, { MouseEvent, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionContext } from './Layout';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const { email, logOut } = useContext(SessionContext);
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className={styles.left}>
      <Link href='/' className={styles.bold} data-active={isActive('/')}>
        Home
      </Link>
    </div>
  );

  let right = null;

  if (!email.length) {
    right = (
      <div className={styles.right}>
        <Link href='/signin' data-active={isActive('/signin')}>
          sign up / in
        </Link>
      </div>
    );
  } else {
    left = (
      <div className={styles.left}>
        <Link href='/' className={styles.bold} data-active={isActive('/')}>
          Home
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p>({email})</p>
        <Link href='/new' data-active={isActive('/new')}>
          New quote
        </Link>
        <button onClick={logOut}>Log out</button>
      </div>
    );
  }

  return (
    <nav className={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Navbar;
