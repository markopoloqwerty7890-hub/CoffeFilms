import React, { createContext, useEffect, useState } from 'react';

const genId = () => Math.random().toString(36).slice(2, 9);

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem('users');
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.log(err);
    }

    return [
      { id: 'u1', firstName: 'Иван', lastName: 'Иванов', age: 25 },
      { id: 'u2', firstName: 'Мария', lastName: 'Петрова', age: 30 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (err) {
      console.log(err);
    }
  }, [users]);

  const addUser = (data) => {
    const newUser = { id: genId(), ...data };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const updateUser = (id, updated) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updated } : u)));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const getUser = (id) => users.find(u => u.id === id);

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return React.useContext(UsersContext);
}

export default UsersContext;
