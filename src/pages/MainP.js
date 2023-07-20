import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../const';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import Paginator from './Paginator';

import { Container, Row, Button, Col } from 'react-bootstrap';
import './mainP.css';


export const MainP = () => {
  const [cookies, setCookies] = useCookies();
  const [books, setBooks] = useState([]);

  const offset = useSelector((state) => state.pagecounter.value);
  console.log(`Bearer ${cookies.token}`);
  useEffect(() => {
    axios
      .get(`${url}/books?offset=` + offset * 10, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log('r' + offset);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  return (
    <Container>
      <Row>
        <h1>書籍レビュー一覧</h1>
        {books.map((book) => {
          return (
            <Col xs={12} md={6} key={book.id}>
              <div className="book">
                <div className="book__imgwraper">
                  <img className="book__img" src="./bookimg.jpg" />
                </div>
                <div className="book__header">
                  <p>題名:{book.title}</p>
                </div>
                <div className="book__body">
                  <b>感想</b>
                  <br />
                  <span>{book.detail}</span>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Paginator />
    </Container>
  );
};

export default MainP;


