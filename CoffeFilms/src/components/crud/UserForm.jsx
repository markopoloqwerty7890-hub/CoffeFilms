import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../crud/UsersContext';

export default function UserForm({ mode = 'new' }) {
  const { id } = useParams();
  const { addUser, getUser, updateUser } = useUsers();
  const navigate = useNavigate();

  const isEdit = mode === 'edit';
  const existing = isEdit ? getUser(id) : null;

  if (isEdit && !existing) {
    return <h2>Пользователь не найден</h2>;
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && existing) {
      setForm({
        firstName: existing.firstName,
        lastName: existing.lastName,
        age: String(existing.age)
      });
    }
  }, [isEdit, existing]);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Имя обязательно';
    if (!form.lastName.trim()) e.lastName = 'Фамилия обязательна';
    if (!form.age.trim()) e.age = 'Возраст обязателен';
    else if (!/^\d+$/.test(form.age) || Number(form.age) <= 0 || Number(form.age) > 120)
      e.age = 'Введите корректный возраст';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: Number(form.age)
    };

    if (isEdit) {
      updateUser(id, payload);
      navigate(`/users/${id}`);
    } else {
      const newUser = addUser(payload);
      navigate(`/users/${newUser.id}`);
    }
  };

  return (
    <section>
      <h2>{isEdit ? 'Редактировать пользователя' : 'Добавить нового пользователя'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Имя
          <input
            value={form.firstName}
            onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </label>

        <label>
          Фамилия
          <input
            value={form.lastName}
            onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </label>

        <label>
          Возраст
          <input
            value={form.age}
            onChange={e => setForm(prev => ({ ...prev, age: e.target.value }))}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </label>

        <div className="form-actions">
          <button className="btn" type="submit">
            {isEdit ? 'Сохранить изменения' : 'Сохранить'}
          </button>
          <button
            className="btn outline"
            type="button"
            onClick={() => (isEdit ? navigate(`/users/${id}`) : navigate('/users'))}
          >
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
}
