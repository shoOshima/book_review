import React from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router =() =>{
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
    <Routes>
      {/* <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      {auth ? (
        <>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/task/new" element={<NewTask />} />
          <Route exact path="/list/new" element={<NewList />} />
          <Route
            exact
            path="/lists/:listId/tasks/:taskId"
            element={<EditTask />}
          />
          <Route exact path="/lists/:listId/edit" element={<EditList />} />
        </>
      ) : (
        <Route exact path="/" element={<SignIn />} />
      )}
      <Route element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
  )
}