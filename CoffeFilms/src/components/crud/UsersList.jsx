import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../crud/UsersContext';

export default function UsersList() {
  const { users, deleteUser } = useUsers(); 

  if (!users || users.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Список пользователей</h2>
        <p>Пользователей нет</p>
        <Link to="/users/new">Добавить нового</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Список пользователей</h2>
      <Link to="/users/new">Добавить нового</Link>
      <ul>
        {users.map(u => (
          <li key={u.id} style={{ marginBottom: '10px' }}>
            {u.firstName} {u.lastName} ({u.age})
            {' | '}
            <Link to={`/users/${u.id}`}>Просмотр</Link>
            {' | '}
            <Link to={`/users/${u.id}/edit`}>Редактировать</Link>
            {' | '}
            <button onClick={() => deleteUser(u.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
