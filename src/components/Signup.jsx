
import './Signup.scss';
import bigLogo from './images/bigLogo.svg';

function Signup() {
  return (
    <div className="Signup">
        <img src={bigLogo} />
        <h1>Signup</h1>

        <form className="outer-form">
            <span className="form-subheading">Please enter your email & password.</span>
            <input type="email" placeholder="Email" className="form-input" ></input>
            <input type="password" placeholder="Password" className="form-input"></input>
            <input type="password" placeholder="Confirm Password" className="form-input"></input>
            
            <button type="submit" className="form-btn">Signup</button>
            <a href="#" className="form-link">Already have an account? Click here.</a>
        </form>
    </div>
  );
}

export default Signup;
