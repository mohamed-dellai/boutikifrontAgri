import React from "react";
import { ReactComponent as One } from "./grocery.svg";
import { ReactComponent as Two } from "./milk.svg";
import { ReactComponent as Three } from "./sucre.svg";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Categories = () => {
  const history = useHistory();
  const data = [
    {
      cateImg: <One />,
      cateName: "Épicerie salée",
    },
    {
      cateImg: <Two />,
      cateName: "Épicerie laitier",
    },
    {
      cateImg: <Three />,
      cateName: "Produit sucrée",
    },
  ];
  const handleCategoryClick = () => {
    history.push('/products'); // Redirect to "/products" route
  };

  return (
    <div className='category'>
      {data.map((value, index) => (
        <div className='box f_flex' key={index} onClick={handleCategoryClick}>
          {value.cateImg}
          <span>{value.cateName}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
