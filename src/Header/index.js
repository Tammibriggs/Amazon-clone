import './index.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom'
import {useStateValue} from '../StateProvider'
import {auth} from '../firebase'
import {signOut} from 'firebase/auth'

function Header() {
  const [{basket, user}, dispatch] = useStateValue()

  const handleAuthentication = () => {
    if(user) {
       signOut(auth)
    }
  }
    return (
      <div className="header">
        <div className="header__container">
          <Link to="/" className='logo'>
            {/* <img src='/logo.svg' width={40} height={40}/> */}
            Amazemo
          </Link>
        
          <div className="header__search">
            <div>
              <input
                  className="header__searchInput"
                type="text"
              />
              <SearchIcon
                  className="header__searchIcon"
              />
            </div>
          </div>

          <div className="header__nav">
            <Link to={!user && '/login'}>
              <div className="header__option"   onClick={handleAuthentication}>
                <span className="header__optionLineOne header-email">
                  {user ? user?.email: 'Hello guest'}
                </span>
                <span className="header__optionLineTwo">
                    {user ? 'Sign Out': 'Sign In'}
                </span>
              </div>
            </Link>
          
            <Link to="/orders">
              <div className="header__option header--option">
                <span className="header__optionLineOne">
                    Returns
                </span>
                <span className="header__optionLineTwo">
                    Orders
                </span>
              </div>
            </Link>

            {/* <div className="header__option header--option">
              <span className="header__optionLineOne">
                  Your
              </span>
              <span className="header__optionLineTwo">
                  Prime
              </span>
            </div> */}

            <Link to="/checkout">
              <div className="header__optionBasket">
                <ShoppingBasketIcon className="header__basketIcon"/>
                <span 
                className="header__optionLineTwo header__basketCount"
                >{basket?.length}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="header--search">
          <input
              className="header__searchInput"
            type="text"
          />
          <SearchIcon
              className="header__searchIcon"
          />
        </div>
      </div>
    )
}

export default Header
