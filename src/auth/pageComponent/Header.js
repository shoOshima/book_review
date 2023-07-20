import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { signOut } from '../authSlice';
import { url } from '../../const';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export const Header = () => {
  const [cookie, setCookies, removeCookie] = useCookies();
  const auth = useSelector((state) => state.auth.isSignIn);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const handleLogout = () => {
    setUserName('');
    removeCookie('token');
    dispatch(signOut());
    <Navigate to="/" />;
  };

  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
            accept: 'application/json',
          },
        })
        .then((res) => {
          setUserName(res.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <Navbar
      expand="sm"
      className="bg-primary"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">書籍レビューサービス</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">書籍一覧</Nav.Link>
            <Nav.Link href="#link">書籍登録</Nav.Link>
            <Nav.Link href="#link">ユーザー設定</Nav.Link>
          </Nav>
          <Navbar.Text>
            {auth ? 'Hi!' : ''}
            {userName}
          </Navbar.Text>
          <Nav>
            {auth ? (
              <Nav.Link onClick={handleLogout}>ログアウト</Nav.Link>
            ) : (
              <Button variant="success" size="lg" href="/login">
                ログイン
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
