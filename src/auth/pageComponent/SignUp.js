import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../const';
import { signIn } from '../authSlice';
import Compressor from 'compressorjs';

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookies] = useCookies();
  const [imgfile, setImgFile] = useState();
  const [imgurl, setImgUrl] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => {
    axios
      .post(`${url}/users`, {
        name: data.name,
        email: data.mail,
        password: data.password,
      })
      .then((res) => {
        setCookies('token', res.data.token);
        dispatch(signIn());
        axios.post(
          `${url}/uploads`,
          {
            icon: imgfile,
          },
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      })
      .catch((err) => {
        setErrorMessage(`新規登録に失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  const handleFileUp = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    new Compressor(file, {
      maxHeight: 200,
      convertSize: Infinity,
      success(result) {
        setImgFile(result);
        setImgUrl(URL.createObjectURL(result));
      },
    });
  };

  return (
    <>
      <main className="signup">
        <h2>新規登録</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="email-label">表示名</label>
          <br />
          <input
            className="name-input"
            data-cy="Form-input-name"
            {...register('name', {
              required: true,
              maxLength: 10,
              minLength: 2,
            })}
          />
          <br />
          {errors.name && (
            <span data-cy="Form-input-name-valierror">
              表示名は必須で2文字以上10文字以下
            </span>
          )}
          <br />
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            className="email-input"
            data-cy="Form-input-mail"
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
            <span data-cy="Form-input-mail-valierror">
              {errors.mail.message}
            </span>
          )}
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            autoComplete="on"
            {...register('password', { required: true, minLength: 4 })}
          />
          <br />
          {errors.password && (
            <span data-cy="Form-input-password-valierror">
              パスワード4文字以上
            </span>
          )}
          <br />
          <br />
          <input type="file" onChange={handleFileUp} accept=".png, .jpg" />
          <br />
          <img src={imgurl} id="preview" />
          <br />
          <br />
          <button type="submit" className="signin-button" data-cy="Form-submit">
            新規登録
          </button>
        </form>
        <Link to="/">TOPへ</Link>
      </main>
    </>
  );
};

export default SignUp;
