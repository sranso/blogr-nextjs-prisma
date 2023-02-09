import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import prisma from "../lib/prisma";

const SignUp: React.FC = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: typeof state[keyof typeof state] = event.target.value;
    setState({ ...state, [event.target.id]: value });
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /**
     * attempt to save to users db
     * if user found, say sign in instead
     * if email bad format, display error message
     * else sign up and sign in
     */
    console.log("create user", state);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Sign up</p>
        <label>
          Name:
          <input type="text" id="name" name="name" onChange={onFieldChange} />
        </label>
        <label>
          Email:
          <input type="text" id="email" name="email" onChange={onFieldChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Link href="/signin">Sign in instead</Link>
    </div>
  );
};

export default SignUp;
