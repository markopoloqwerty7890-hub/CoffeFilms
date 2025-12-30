import { Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import MovieList from "../components/movieList/MovieList";
import MoviePage from "../pages/moviePage/MoviePage";
import FavoritesPage from "../pages/favorites/FavoritesPage";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import ProtectedRoute from "../auth/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MoviePage />} />

          {/* 🔒 ЗАЩИЩЁННЫЙ МАРШРУТ */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          {/* 🔐 AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
