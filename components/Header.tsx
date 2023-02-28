import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const [session, setSession] = useState({ email: "" });

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  useEffect(() => {
    const getCookie = async () => {
      const cookie = await Cookies.get("session");
      if (cookie) {
        setSession({
          email: cookie
        });
      }
    }
    getCookie();
  }, [session.email])

  let left = (
    <div className="left">
      <Link href="/" className="bold" data-active={isActive("/")}>Home</Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (!session.email.length) {
    right = (
      <div className="right">
        <Link href="/signin" data-active={isActive("/signin")}>
          sign up / in
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  } else {
    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive("/")}></Link>
        <Link href="/drafts" data-active={isActive("/drafts")}>
          My drafts
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          ({session.email})
        </p>
        <button onClick={() => console.log("new post")}>New post</button>
        <button onClick={() => Cookies.remove("session")}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
