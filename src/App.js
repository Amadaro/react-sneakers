import React from 'react';
import Card from './components/Card';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  let [items, setItems] = React.useState([]);
  let [cartItems, setCartItems] = React.useState([]);
  let [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState([false]);

  React.useEffect(() => {
    axios
      .get('https://63fb9afc7a045e192b6c4938.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get('https://63fb9afc7a045e192b6c4938.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63fb9afc7a045e192b6c4938.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63fb9afc7a045e192b6c4938.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : 'Все кроссовки'}
          </h1>
          <div className="search-block  d-flex">
            <img src="img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear  cu-p"
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
              type="text"
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(item)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
