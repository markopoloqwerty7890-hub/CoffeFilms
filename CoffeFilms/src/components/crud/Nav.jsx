import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const active = ({ isActive }) => isActive ? 'navlink active' : 'navlink';
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <NavLink to="/" className={active}>Главная</NavLink>
        <NavLink to="/users" className={active}>Пользователи</NavLink>
        <NavLink to="/users/new" className={active}>Добавить</NavLink>
      </div>
    </nav>
  );
}
