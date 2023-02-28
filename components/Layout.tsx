import React, { ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [session, setSession] = useState({ email: "" });

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
  }, [session.email]);

  return (
    <>
      <div className="layout">
        <Navbar session={session} />
        {props.children}
      </div>
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
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
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
  )
};

export default Layout;
