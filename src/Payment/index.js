import './index.css'
import {useStateValue} from '../StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import {Link} from 'react-router-dom'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {useState, useEffect} from 'react'
import { getBasketTotal } from '../reducer'
import CurrencyFormat from 'react-currency-format'
import {useHistory} from 'react-router-dom'
import axios from './axios'
import {db} from '../firebase'
import {doc, setDoc} from 'firebase/firestore'

function Payment() {
  const history = useHistory()
  const [{basket, user}, dispatch] = useStateValue()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState("")
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientScret] = useState(true)

  // generate the special stript secret which allows us to charge a customer
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url:`/payments/create?total=${getBasketTotal(basket) * 100 }`
      })
      setClientScret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    stripe.confirmCardPayment(clientSecret, {payment_method: {
      card: elements.getElement(CardElement)
    }}).then(({paymentIntent}) => {
      //paymentIntent = payment confirmation
      const ref = doc(db, 'users', user?.uid, 'orders', paymentIntent.id)
      setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      dispatch({
        type: "EMPTY_BASKET"
      })
      history.replace('/orders')
    })
  }

  const handleChange = event => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const stripe = useStripe()
  const elements = useElements()

  return (
    <div className="payment">
      <div className="payment__container">

        <h1>
          Checkout {<Link to="/checkout">{basket?.length} items</Link>}
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delibery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
          </div>
        </div> 

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
           </div>
        </div>
        
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3> 
          </div>
          <div className="payment__details">

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment__priceContainer">
                <CurrencyFormat 
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )} 
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />  
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>

          </div>
        </div> 
      </div>
    </div>
  )
}

export default Payment
