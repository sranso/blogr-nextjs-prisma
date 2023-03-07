import React, { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { User, ResponseError } from '../interfaces';

const isResponseError = (data: User | ResponseError): data is ResponseError => {
  return (data as ResponseError).message !== undefined;
};

const SignUp: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const signUpUser = async () => {
    const res = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data: User | ResponseError = await res.json();
    if (res.status === 200) {
      console.log('user created', data);
      Cookies.set('session', user.email);
      router.push('/');
    }
    if (res.status === 409 && isResponseError(data)) {
      console.error('error', data);
      setError(data.message);
    }
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: typeof user[keyof typeof user] = event.target.value;
    setUser({ ...user, [event.target.id]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpUser();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <p>Sign up</p>
        <label>
          Name:
          <input type='text' id='name' name='name' onChange={onFieldChange} />
        </label>
        <label>
          Email:
          <input type='text' id='email' name='email' onChange={onFieldChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
      {error.length ? <p className='error'>{error}</p> : null}
      <Link href='/signin'>Sign in instead</Link>
      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

export default SignUp;
