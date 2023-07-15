import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../const';
import { signIn } from '../authSlice';

export const SignIn = () => {

  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [cookies,setCookies, removeCookie] = useCookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookies('token', res.data.token);
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };
//  if (auth) return <Navigate to="/" />;
 
const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <div>
      <h2>ログイン</h2>
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            className="email-input"
            data-cy="Form-input-mail"
            {...register("mail",
              {required: true,
                pattern: {
                value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'メールアドレスの形式が不正です',}})}
            /><br />
            {errors.mail && <span data-cy="Form-input-mail-valierror" >{errors.mail.message}</span>}
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            onChange={handlePasswordChange}
            autoComplete="on"
          />
          <br />
          <button type="submit" className="signin-button" data-cy="Form-submit">
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  )
}

export default SignIn;