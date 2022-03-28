import clientAxios from '../config/clientAxios';
import { useState } from 'react';
import { Link } from "react-router-dom"
import Alert from '../components/Alert';


const ForgetPassword = () => {

  const [ email, setEmail ] = useState('');
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '') {
      setAlert({
        msg: 'The email is required',
        error: true
      });
      return;
    }

    try {

      const { data } = await clientAxios.post(`/users/forget-password`,
      { email });

      setAlert({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alert;

  return (
    <>

      <h1
        className="text-sky-600 font-black text-center text-5xl"
      >Forgot password
      </h1>

      { msg && <Alert alert={alert} /> }

      <form 
          className="my-5 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}    
      >

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

        <input
          type="submit"
          value="Email Me"
          className="bg-sky-700 mb-5 w-full py-3 
                text-white font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"

        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Have an account yet? <br /> <span className="font-bold">Sign In.</span></Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >Don't have an account? <br /> <span className="font-bold">Sign up now!</span></Link>

      </nav>

    </>

  )
}

export default ForgetPassword