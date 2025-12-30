import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <h1>Управление пользователями</h1>
      <p>Простое приложение для создания, просмотра, редактирования и удаления пользователей (имя, фамилия, возраст).</p>
      <p>
        <Link to="/users" className="btn">Перейти к списку пользователей</Link>
        {' '}
        <Link to="/users/new" className="btn outline">Добавить пользователя</Link>
      </p>
      <hr />
      <p>Требования: React Router (BrowserRouter, Routes, Route, Link, useParams, useNavigate), хранение в state / localStorage.</p>
    </section>
  );
}
