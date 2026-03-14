"use client";
import styles from "./Auth.module.css";



export default function SignInPage() {
  return (
    <div className="login">
      {/* <img */}
      {/*   src="https://www.letseatcake.com/wp-content/uploads/2021/07/funny-memes-13.jpg" */}
      {/*   alt="login image" */}
      {/*   className="login__img" */}
      {/* /> */}

      <form className="login__form">
        <h1 className="login__title">login</h1>

        <div className="login__content">
          {/* Username */}
          <div className="login__box">
            <i className="bx bx-lock-alt"></i>

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                placeholder=""
              />
              <label className="login__label">Username</label>
            </div>
          </div>

          {/* Password */}
          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pas"
                placeholder=""
              />
              <label className="login__label">Password</label>
              <i className="ri-eye-off-line login__eye"></i>
            </div>
          </div>
        </div>

        {/* Remember + forgot */}
        <div className="login__check">
          <div className="login__check-group">
            <input
              type="checkbox"
              className="login__check-input"
            />
            <label className="login__check-label">
              Remember me
            </label>
          </div>

          <a href="#" className="login__forgot">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="login__button">
          Login
        </button>

        <p className="login__register">
          Don&apos;t have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
}

