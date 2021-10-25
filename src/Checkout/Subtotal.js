import './subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../reducer'
import {useHistory} from 'react-router-dom'

function Subtotal() {
  const history = useHistory()
  const [{basket, user}, dispatch] = useStateValue()

  const proceedToPayment = () => {
    if (basket.length){
      user ? history.push('/payment') : history.push('/login')
    }else {
      alert('Shopping cart is empty')
    }
  }
  
  return (
    <div className="subtotal">
      {/* An easy way to display currency */}
      <CurrencyFormat 
        renderText={(value) => (
          <>
            <p className="subtotal__p">
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox"/> This order contains a gift
            </small>
          </>
        )} 
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />   
<button onClick={proceedToPayment} >
  Proceed to Checkout
</button>
    </div>
  )
}

export default Subtotal
