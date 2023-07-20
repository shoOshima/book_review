import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { incrementByAmount } from './pageCount';

export const Paginator = () => {
  const nowPage = useSelector((state) => state.pagecounter.value);
  const bai = Math.floor(nowPage / 5);
  const dispatch = useDispatch();

  const pHandle = (e) => {
    console.log(e);
    let nextnum = e <= 0 ? 0 : e;
    console.log(nextnum);
    dispatch(incrementByAmount(nextnum));
  };

  let items = [];
  for (let num = bai * 5 + 1; num <= (bai + 1) * 5; num++) {
    items.push(
      <Pagination.Item
        key={num}
        active={num - 1 == nowPage}
        onClick={() => pHandle(num - 1)}
      >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="lg">
      <Pagination.First onClick={() => pHandle(0)} />
      <Pagination.Prev onClick={() => pHandle(nowPage - 1)} />
      {items}

      <Pagination.Next onClick={() => pHandle(nowPage + 1)} />
    </Pagination>
  );
};

export default Paginator;
