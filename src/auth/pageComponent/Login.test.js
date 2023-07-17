import React, { useState,useContext } from 'react';
import { render, screen,cleanup, getByTestId } from '@testing-library/react'
import { Provider } from 'react-redux';
import {store} from '../store'
import { CookiesProvider } from 'react-cookie';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {Login} from './Login'

afterEach(cleanup);

describe('inputチェック', () => {
  test('メアドのinputあるか' , () => {
    const r = render(
      <Provider store={store}>
        <CookiesProvider>
        <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
        </CookiesProvider>
      </Provider>
      );
      expect(r.getByTestId('Form-input-mail')).toBeTruthy();
  })
  test('パスのinputあるか' , () => {
    const r = render(
      <Provider store={store}>
        <CookiesProvider>
        <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
        </CookiesProvider>
      </Provider>
      );
      expect(r.getByTestId('Form-input-pass')).toBeTruthy();
  })
  })

  describe('labelチェック', () => {
    test('メアドのlabelあるか' , () => {
      const r = render(
        <Provider store={store}>
          <CookiesProvider>
          <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login />} />
          </Routes>
      </BrowserRouter>
          </CookiesProvider>
        </Provider>
        );
        expect(r.getByTestId('Form-mail-label')).toHaveTextContent("メールアドレス")
    })
    test('パスワードのlabelあるか' , () => {
      const r = render(
        <Provider store={store}>
          <CookiesProvider>
          <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login />} />
          </Routes>
      </BrowserRouter>
          </CookiesProvider>
        </Provider>
        );
        expect(r.getByTestId('Form-pass-label')).toHaveTextContent("パスワード")
    })

    })
    test('ログインボタンあるか' , () => {
      const r = render(
        <Provider store={store}>
          <CookiesProvider>
          <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login />} />
          </Routes>
      </BrowserRouter>
          </CookiesProvider>
        </Provider>
        );
        expect(r.getByTestId('Form-submit')).toBeTruthy();
    })
  