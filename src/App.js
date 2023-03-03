import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  let [items, setItems] = React.useState([]);
  let [cartItems, setCartItems] = React.useState([]);
  let [favorites, setFavorites] = React.useState([]);
  let [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/f8ad8919-f654-495c-9fdb-9e45aabb9dca')
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get('https://63fb9afc7a045e192b6c4938.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get('https://63fb9afc7a045e192b6c4938.mockapi.io/favorites')
      .then((res) => {
        setFavorites(res.data);
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

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://63fb9afc7a045e192b6c4938.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://63fb9afc7a045e192b6c4938.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
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

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
