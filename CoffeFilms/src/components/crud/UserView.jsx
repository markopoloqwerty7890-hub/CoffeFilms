import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../crud/UsersContext';

export default function UserView() {
  const { id } = useParams();
  const { getUser, deleteUser } = useUsers();
  const user = getUser(id);
  const navigate = useNavigate();

  if (!user) return <p>Пользователь не найден.</p>;

  const handleDelete = () => {
    if (confirm('Точно удалить?')) {
      deleteUser(id);
      navigate('/users');
    }
  };

  return (
    <section>
      <h2>Пользователь: {user.firstName} {user.lastName}</h2>
      <p><strong>Имя:</strong> {user.firstName}</p>
      <p><strong>Фамилия:</strong> {user.lastName}</p>
      <p><strong>Возраст:</strong> {user.age}</p>

      <div className="actions">
        <Link to={`/users/${id}/edit`} className="btn">Редактировать</Link>
        <button onClick={handleDelete} className="btn danger">Удалить</button>
        <button onClick={() => navigate('/users')} className="btn outline">Назад к списку</button>
      </div>
    </section>
  );
}
