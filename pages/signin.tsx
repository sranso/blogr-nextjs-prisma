import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import type { User, ResponseError } from "../interfaces";

const isResponseError = (data: User | ResponseError): data is ResponseError => {
  return (data as ResponseError).message !== undefined;
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const signInUser = async () => {
    const res = await fetch(`/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      })
    });
    const data: User | ResponseError = await res.json();
    if (res.status === 200) {
      console.log("user signed in", data);
      Cookies.set("session", email);
      router.push("/");
    }
    if (res.status === 404 && isResponseError(data)) {
      console.error("error", data);
      setError(data.message);
    }
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
    <>
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
    {error.length ? <p className="error">{error}</p> : null}
    <Link href="/signup">Sign up instead</Link>
    <style jsx>{`
      .error {
        color: red;
      }
    `}</style>
    </>
  );
};

export default SignIn;
