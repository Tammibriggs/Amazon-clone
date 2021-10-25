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
      <Link to="/">
        <img 
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container"> 
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

          <button onClick={signIn} type="submit" className="login__signInButton">Sign In</button>
        </form>

        <p>
          By signing-in you agree to the AMAZONE FAKE CLONE Condi & Sale. Please see our Privacy Notice, our Cookies and our Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={regiter}>Create your Amazon Account </button>
      </div>
    </div>
  )
}

export default Login