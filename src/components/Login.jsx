
import './Login.scss';
import bigLogo from './images/bigLogo.svg';

function Login() {
  return (
    <div className="Login">
        <img src={bigLogo} />
        <h1>Calculate live currency fast & easy </h1>

        <form className="outer-form">
            <span className="form-subheading">Please enter your email & password.</span>
            <input type="email" placeholder="Email" className="form-input"></input>
            <input type="password" placeholder="Password" className="form-input"></input>
            
            <button type="submit" className="form-btn">Login</button>
            <a href="/signup" className="form-link">Don’t have an account? Click here.</a>
        </form>
    </div>
  );
}

export default Login;
