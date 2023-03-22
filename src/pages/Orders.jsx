import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import Info from '../components/Info';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://640e17fbb07afc3b0dbf0c82.mockapi.io/orders'
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при отображении заказов');
        console.error();
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1> Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders.length > 0 ? (
          (isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card key={index} loading={isLoading} {...item} />
          ))
        ) : isLoading ? (
          [...Array(8)]
        ) : (
          <Info
            title="У вас нет заказов"
            description="Оформите хотя бы один заказ"
            image="img/empty-orders.png"
            btnLink="/"
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
