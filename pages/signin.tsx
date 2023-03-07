import React, { ChangeEvent, FormEvent, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionContext } from '../components/Layout';
import type { User, ResponseError } from '../interfaces';
import { isResponseError } from '../interfaces';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useContext(SessionContext);
  const router = useRouter();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: string = event.target.value;
    setEmail(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`/api/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    });
    const data: User | ResponseError = await res.json();

    if (res.status === 200) {
      signIn(email);
      router.push('/');
    }
    if (res.status === 404 && isResponseError(data)) {
      console.error('error', data);
      setError(data.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <p>Sign in</p>
        <label>
          Email:
          <input
            autoFocus
            type='text'
            id='email'
            name='email'
            onChange={onFieldChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
      {error.length ? <p className='error'>{error}</p> : null}
      <Link href='/signup'>Sign up instead</Link>
      <style jsx>{`
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

export default SignIn;
