import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  title?: string; 
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1); 
  };

  if (location.pathname.startsWith('/recipe/')) {
    return (
      <header className="header">
        <button onClick={handleBackClick} className="back-button">Назад</button>
        <h1 className="title">{title}</h1>
      </header>
    );
  }

  return (
    <header className="header">
      <h1 className="logo">Рецепти</h1>
      <div className="cart-icon">
        <button onClick={() => navigate('/cart')}>Cart</button>
      </div>
    </header>
  );
};

export default Header;
