import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2';

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  cartQuantity: null,
  refreshHeader: null,
  setUser: () => { },
  setToken: () => { },
  setCartQuantity: () => { },
  setNotification: () => { },
  setRefreshHeader: () => { },
})

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(JSON.parse(localStorage.getItem('AUTH_USER')));
  const [cartQuantity, _setCartQuantity] = useState(localStorage.getItem('CART_QTY'));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [refreshHeader, _setRefreshHeader] = useState(localStorage.getItem('REFRESH_HEADER'));
  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setCartQuantity = (cartQuantity) => {
    _setCartQuantity(cartQuantity)
    if (cartQuantity) {
      localStorage.setItem('CART_QTY', cartQuantity);
    } else {
      localStorage.removeItem('CART_QTY');
    }
  }
  const setUser = (user) => {
    _setUser(user)
    if (user) {
      localStorage.setItem('AUTH_USER', JSON.stringify(user));
    } else {
      localStorage.removeItem('AUTH_USER');
    }
  }

  const setRefreshHeader = (header) => {
    _setRefreshHeader(header)
    if (header) {
      localStorage.setItem('REFRESH_HEADER', header);
    } else {
      localStorage.removeItem('REFRESH_HEADER', header);
    }
  }
  const setNotification = message => {
    Swal.fire({
      type: 'success',
      icon: 'success',
      title: 'Success',
      text: message,
      customClass: 'swal-wide',
    })
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
      cartQuantity,
      setCartQuantity,
      refreshHeader,
      setRefreshHeader
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);