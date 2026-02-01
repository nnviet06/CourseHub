
'use client'
import { useState } from 'react';

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeInput = (value, setter) => {
    setter(value);
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log("Login user with username:", username, "and Password:", password);
  }

  return (
    <>
      <div>
        <h1>
          Sign In
        </h1>
        <form
          onSubmit={handleLogIn}
        >
          <section>
            <label
              htmlFor="signinUsername"
            >
              Username
            </label>
            <input
              type="text"
              id="signinUsername"
              placeholder="Your Username"
              name="signinUsername"
              value={username}
              onChange={(e) => handleChangeInput(e.target.value, setUsername)}
            ></input>
          </section>
          <section>
            <label
              htmlFor="signinPassword"
            >
              Password
            </label>
            <input
              type="password"
              id="signinPassword"
              placeholder="Your Password"
              name="signinPassword"
              value={password}
              onChange={(e) => handleChangeInput(e.target.value, setPassword)}
            >
            </input>
          </section>
          <section>
            <button
              type="submit"
            >
              Sign In
            </button>
          </section>
        </form>
      </div>
    </>
  )
}

export default SignInPage;
