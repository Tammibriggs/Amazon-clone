import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import {auth} from "../firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import './index.css'

function Login(){
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then( () => {
        history.push('/')
      })
      .catch(error => alert(error.message))
  }

  const regiter = e => {
    e.preventDefault()
    // Create a new user with email and password using firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if(auth){
          history.push('/')
        }
      })
      .catch((error => alert(error.message)))
  }  

  return(
    <div className="login">
      <Link to="/" className='logo'>
        Amazemo
      </Link>

      <div className="login__container"> 
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>

          <button onClick={signIn} type="submit" className="login__signInButton">Sign In</button>
        </form>

        <div className='divider'>
          <span>OR</span>
          <hr />
        </div>
        
        <button className="login__registerButton" onClick={regiter}>Create an Amazemo Account </button>
      </div>
    </div>
  )
}

export default Login