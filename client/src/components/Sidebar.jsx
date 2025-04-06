import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-800 text-white w-full md:w-64 p-4 space-y-4">
      <nav className="space-y-2 ">
        <h2 className="text-xl font-bold text-gray-400">Dashboard</h2>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "block bg-gray-700 p-2 rounded text-white"
              : "block p-2 rounded hover:bg-gray-700"
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/mybookings"
          className={({ isActive }) =>
            isActive
              ? "block bg-gray-700 p-2 rounded text-white"
              : "block p-2 rounded hover:bg-gray-700"
          }
        >
          My Bookings
        </NavLink>

        {currentUser?.isAdmin && (
          <>
            <NavLink
              to="/dashboard/bookings"
              className={({ isActive }) =>
                isActive
                  ? "block bg-gray-700 p-2 rounded text-white"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Bookings
            </NavLink>

            <NavLink
              to="/dashboard/addEvent"
              className={({ isActive }) =>
                isActive
                  ? "block bg-gray-700 p-2 rounded text-white"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Add Movie
            </NavLink>

            <NavLink
              to="/dashboard/editevents"
              className={({ isActive }) =>
                isActive
                  ? "block bg-gray-700 p-2 rounded text-white"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Edit / View Movies
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
