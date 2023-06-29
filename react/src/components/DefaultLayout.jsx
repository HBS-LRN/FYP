import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const { user, token, authUser, refreshHeader, setUser, setToken, setRefreshHeader, notification } = useStateContext();


  console.log(authUser);
  if (!token) {
    return <Navigate to="/login" />;
  } else if (authUser.role !=2) {
    return <Navigate to="/accessProhibited" />;
  }


  const onLogout = ev => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  const fetchUser = () => {
    axiosClient.get(`/users/${authUser.id}`)
      .then(({ data }) => {
        setUser(data);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [authUser]);

  useEffect(() => {
    if (refreshHeader) {
      console.log('haha');
      fetchUser();
      setRefreshHeader(null);
    }
  }, [refreshHeader]);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>

        {authUser.role === 2 && (
          <Link to="/shoppingCart">Shopping Cart</Link>
        )}
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  );
}
