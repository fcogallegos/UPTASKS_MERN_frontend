import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from '../components/Alert';
import axios from 'axios';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'All the fields are required',
        error: true
      })
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: 'The passwords are not equals',
        error: true
      })
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'The password must be greater than 6 characters',
        error: true
      })
      return;
    }

    setAlert({})

    //create the user in the API
    try {
      //TODO: Mover to an axios customer
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`,
      { name, email, password });

      setAlert({
        msg: data.msg,
        error: false
      })

      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');

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
      >Create account
      </h1>

      {msg && <Alert alert={alert} />}

      <form className="my-5 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
            onChange={e => setName(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
            onChange={e => setRepeatPassword(e.target.value)}
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
        >Have an account yet? <br /> <span className="font-bold">Sign In.</span></Link>

        <Link
          className="block text-center font-bold my-5 text-slate-500 uppercase text-sm"
          to="/forget-password"
        >Forgot my password.</Link>
      </nav>

    </>
  )
}

export default Register