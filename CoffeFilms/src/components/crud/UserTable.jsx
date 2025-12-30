import React from 'react';
import { Link } from 'react-router-dom';

export default function UserTable({ users, onDelete }) {
  if (!users.length) return <p>Пока нет пользователей.</p>;
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Возраст</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.age}</td>
            <td className="actions">
              <Link to={`/users/${u.id}`} className="btn small">Просмотр</Link>
              <Link to={`/users/${u.id}/edit`} className="btn small">Редактировать</Link>
              <button className="btn small danger" onClick={() => {
                if (confirm(`Удалить ${u.firstName} ${u.lastName}?`)) onDelete(u.id);
              }}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
