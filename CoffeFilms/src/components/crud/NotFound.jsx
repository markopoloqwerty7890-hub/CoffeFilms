import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h2>404 — Страница не найдена</h2>
      <p>Такой маршрут не существует.</p>
      <p><Link to="/" className="btn">На главную</Link></p>
    </section>
  );
}
