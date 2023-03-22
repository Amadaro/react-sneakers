import React from 'react';
import { Link } from 'react-router-dom';

const Info = ({ title, image, description, btnClick, btnLink }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column  flex">
      <img className="mb-20" width="120px" src={image} alt="EmptyCart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <Link to={btnLink}>
        <button onClick={btnClick} className="greenButton">
          <img src="img/arrow.svg" alt="" />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
};

export default Info;
