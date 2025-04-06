import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  updateUserFailure,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const Profile = () => {
  const BASE_URL = "http://localhost:9000";

  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${BASE_URL}/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-slate-950">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-950">
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
};

export default Profile;