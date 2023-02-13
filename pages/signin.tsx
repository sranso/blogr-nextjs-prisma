import React, { ChangeEvent, FormEvent, useState } from "react";
import type { User, ResponseError } from "../interfaces";
import Link from "next/link";

const isResponseError = (data: User | ResponseError): data is ResponseError => {
  return (data as ResponseError).message !== undefined;
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  const signInUser = async () => {
    const res = await fetch(`/api/users/${email}`);
    const data: User | ResponseError = await res.json();
    if (res.status === 200) {
      console.log("user signed in", data);
      document.cookie = `session:${email}`;
    }
    if (res.status === 404 && isResponseError(data)) {
      console.error("error", data);
      setError(data.message);
    }
    /**
     * attempt to find user, /api/users/[email]
     *  if 200 user found, sign in, store email in cookie
     *  if email bad format, display error message
     *  else say no user found, sign up instead?
     */
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: string = event.target.value;
    setEmail(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInUser();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Sign in</p>
        <label>
          Email:
          <input
            autoFocus
            type="text"
            id="email"
            name="email"
            onChange={onFieldChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error.length ? <p>{error}</p> : null}
      <Link href="/signup">Sign up instead</Link>
    </div>
  );
};

export default SignIn;
