import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../auth/pageComponent/Login';
import SignUp from '../auth/pageComponent/SignUp';
import MainP from '../pages/MainP';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route exact path="/" element={<MainP />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Login />} />
          </>
        )}
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
