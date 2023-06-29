import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useNotificationContext } from "../contexts/NotificationProvider.jsx";
import Swal from 'sweetalert2';

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setDeleteNotification, setSuccessNotification } = useNotificationContext();
  const { authUser} = useStateContext();
  useEffect(() => {
    getShoppingCart();
  }, [])

  console.log(authUser);

  const getShoppingCart = () => {
    setLoading(true)
    axiosClient.get(`/shoppingCart/${authUser}`)
      .then(({ data }) => {
        setLoading(false)
        console.log(data);
        setShoppingCarts(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Image</th>
              <th>Meal ID</th>
              <th>Shopping Cart Qty</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {shoppingCart.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.meal_image}</td>
                  <td>
                    {u.meal_image ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${u.meal_image}`}
                        alt="Meal Image"
                      />
                    ) : (
                      <img
                        src="/images/no-image.png"
                        alt="No Image"
                      />
                    )}
                  </td>
                  <td>{u.meal_price}</td>
                  <td>{u.pivot.shopping_cart_qty}</td>
                  <td>
                    <Link className="btn-edit" to={`/users/${u.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
