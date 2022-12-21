import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { TiLockClosed } from "react-icons/ti";
import { useRouter } from "next/router";
import Image from "next/image";

const forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleChange = async (e) => {
    if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
     if(e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
     if(e.target.name == 'email') {
      setEmail(e.target.value)
    }
  }

  console.log(router.query);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("Password reset instructions have been sent to your email");
    } else {
      console.log("error");
    }
  };
  const resetPassword = async () => {
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed");
      } else {
        console.log("error");
      }
    }
  };
  return (
    <div>
      <Head>
        <title>Forgot Password -MensCloset.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div>
        <div className=" min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <Image
                src="/logo.jpg"
                width="200"
                height="40"
                objectFit="cover"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Forgot Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link href={"/login"}>
                  <a
                    href="#"
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    Login
                  </a>
                </Link>
              </p>
            </div>
            {router.query.token && (
              <div>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={password}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder=" New Password"
                    />
                  </div>
                  <div>
                    <label htmlFor="cpassword" className="sr-only">
                      Confirm New Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={cpassword}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder="Confirm  New Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={resetPassword}
                    type="submit"
                    className="my-4 group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <TiLockClosed
                        className="h-5 w-5 text-violet-500 group-hover:text-violet-400"
                        aria-hidden="true"
                      />
                    </span>
                    Continue
                  </button>
                </div>
                {password != cpassword && <span className="text-red-600">Passwords don't match</span>}
                {password && password == cpassword && <span className="text-green-600">Passwords match</span>}
              </div>
            )}
            {!router.query.token && (
              <div>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={sendResetEmail}
                    type="submit"
                    className="my-4 group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <TiLockClosed
                        className="h-5 w-5 text-violet-500 group-hover:text-violet-400"
                        aria-hidden="true"
                      />
                    </span>
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgot;
