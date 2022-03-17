import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');



  return (
  <>

    <h1 
      className="text-sky-600 font-black text-center text-5xl"
    >Create your account
    </h1>

    <form className="my-5 bg-white shadow rounded-lg p-10">
      <div className="my-5">
          
          <label 
              className="text-gray-600 block text-xl font-bold"
              htmlFor="name"
          >Name</label>

          <input 
            id="name"
            type="text"
            placeholder="Introduce your Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={ e => setName( e.target.value ) }
          />
      
      </div>

      <div className="my-5">
          
          <label 
              className="text-gray-600 block text-xl font-bold"
              htmlFor="email"
          >Email</label>

          <input 
            id="email"
            type="email"
            placeholder="Register Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={ e => setEmail( e.target.value ) }
          />
      
      </div>

      <div className="my-5">
          
          <label 
              className="text-gray-600 block text-xl font-bold"
              htmlFor="password"
          >Password</label>

          <input 
            id="password"
            type="password"
            placeholder="Register Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={ e => setPassword( e.target.value ) }
          />
      
      </div>

      <div className="my-5">
          
          <label 
              className="text-gray-600 block text-xl font-bold"
              htmlFor="password2"
          >Repeat Password</label>

          <input 
            id="password2"
            type="password"
            placeholder="Repeat your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={ e => setRepeatPassword( e.target.value ) }
          />
      
      </div>

      <input 
            type="submit"
            value="Create Account"
            className="bg-sky-700 mb-5 w-full py-3 
                text-white font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"

      />

    </form>

    <nav className="lg:flex lg:justify-between">
          <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/"
          >Have an account yet? <br/> <span className="font-bold">Sign In.</span></Link>

          <Link
              className="block text-center font-bold my-5 text-slate-500 uppercase text-sm"
              to="/forgot-password"
          >Forgot my password.</Link>
    </nav>

  </>
  )
}

export default Register