import { Link, NavLink } from "react-router-dom";
import { getUser, logoutUser } from "../../utils/auth";

const Header = () => {
  const user = getUser();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white hover:text-red-500 transition duration-300"
        >
          🎬 CoffeeFilms
        </Link>

        {/* NAV */}
        <nav className="flex gap-6 items-center text-lg">
         <NavLink
  to="/"
  className={({ isActive }) =>
    `relative px-1 transition-colors duration-300
     ${isActive ? "text-red-500" : "text-white"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:bg-red-500
     after:origin-left after:scale-x-0
     after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive ? "after:scale-x-100" : ""}`
  }
>
  Главная
</NavLink>


          {user && (
<NavLink
  to="/favorites"
  className={({ isActive }) =>
    `relative px-1 transition-colors duration-300
     ${isActive ? "text-red-500" : "text-white"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:bg-red-500
     after:origin-left after:scale-x-0
     after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive ? "after:scale-x-100" : ""}`
  }
>
  ❤️ Избранное
</NavLink>

          )}

          {/* AUTH */}
          {!user ? (
            <NavLink
              to="/login"
              className="text-white hover:text-red-500 transition"
            >
              Войти
            </NavLink>
          ) : (
            <button
              onClick={() => {
                logoutUser();
                window.location.reload();
              }}
              className="text-white hover:text-red-500 transition"
            >
              Выйти
            </button>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
