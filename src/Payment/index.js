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
  const stripe = useStripe()
  const elements = useElements()

  const [{basket, user}, dispatch] = useStateValue()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState("")
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientScret] = useState(true)
  const total = getBasketTotal(basket) * 100 

  // generate the special stript secret which allows us to charge a customer
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          // Stripe expects the total in a currencies subunits
          url:`/payments/create?total=${total}`
        })
        setClientScret(response.data.clientSecret)
      }catch(err) {
      }
    }

    if(total) {
      getClientSecret()
    }
  }, [basket])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!basket.length) {
      return alert(`Unable to process payment \nThere is no item in your shopping cart`)
    }
    setProcessing(true)
    stripe.confirmCardPayment(clientSecret, {payment_method: {
      card: elements.getElement(CardElement)
    }}).then( async ({paymentIntent}) => {
      //paymentIntent = payment confirmation
      const ref = doc(db, 'users', user?.uid, 'orders', paymentIntent.id)
      try{
        await setDoc(ref, {
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
      }catch(err){
        console.log('This is the error',err)
      }
    })
    .catch((err) => {
      alert(`Unable to process payment
      \nUse a sequence of "42" for card payment`)
      setError(null)
    })
    setProcessing(true)
  }

  const handleChange = event => {
    console.log('reached in here')
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

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
          <div className="payment__test-info">
            <h3>Test Payment</h3> 
            <ul>
              <li>Card number: <span>4242424242424242</span></li>
              <li>Valid future date e.g <span>12/34</span></li>
              <li>Three-digit CVC e.g <span>424</span></li>
              <li>Zip code e.g <span>42424</span></li>
            </ul>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              {/* Errors */}
              {error && <div style={{color:'red'}}>{error}</div>}
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
            </form>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Payment
