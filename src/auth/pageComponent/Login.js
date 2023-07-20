import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../const';
import { signIn } from '../authSlice';

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookies, removeCookie] = useCookies();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${url}/signin`, { email: data.mail, password: data.password })
      .then((res) => {
        setCookies('token', res.data.token);
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <main className="signin">
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="email-label" data-testid="Form-mail-label">
            メールアドレス
          </label>
          <br />
          <input
            className="email-input"
            data-testid="Form-input-mail"
            {...register('mail', {
              required: true,
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'メールアドレスの形式が不正です',
              },
            })}
          />
          <br />
          {errors.mail && (
            <span data-testid="Form-input-mail-valierror">
              {errors.mail.message}
            </span>
          )}
          <br />
          <label className="password-label" data-testid="Form-pass-label">
            パスワード
          </label>
          <br />
          <input
            type="password"
            className="password-input"
            autoComplete="on"
            data-testid="Form-input-pass"
            {...register('password', { required: true })}
          />
          <br />
          <button
            type="submit"
            className="signin-button"
            data-testid="Form-submit"
          >
            ログイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};

export default Login;
