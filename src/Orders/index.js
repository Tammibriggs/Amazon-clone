import React from 'react'
import './index.css'
import {db} from '../firebase'
import {useState, useEffect} from 'react'
import {useStateValue} from '../StateProvider'
import Order from './Order'
import {query, collection, onSnapshot, orderBy} from 'firebase/firestore'

function Orders() {
  const [{basket, user}, dispatch] = useStateValue()

  const [order, setOrders] = useState([]);

  useEffect(() => {
    if(user){
    const ref = collection(db, 'users', user?.uid, 'orders')
    const orderedOrders = query(ref, orderBy('created', 'desc'))
    onSnapshot(orderedOrders, snapshot => {
         setOrders(snapshot.docs.map(doc => ({
           id: doc.id,
           data: doc.data()
         })))
      })
    } else {
      setOrders([])
    }
  }, [user])

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {order?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
