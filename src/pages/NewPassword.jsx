import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Alert from '../components/Alert';


const NewPassword = () => {

  const [validToken, setValidToken] = useState(false);
  const [ alert, setAlert ] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        //TODO: Mover to an axios customer
        await axios.get(`http://localhost:4000/api/users/forget-password/${token}`);

        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    checkToken();
  }, [])

  const { msg } = alert;

  return (
    <>

      <h1
        className="text-sky-600 font-black text-center text-5xl"
      >Create new password
      </h1>

      { msg && <Alert alert={alert} /> }

      {validToken && (
        <form className="my-5 bg-white shadow rounded-lg p-10">

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
            />

          </div>

          <input
            type="submit"
            value="Save New Password"
            className="bg-sky-700 mb-5 w-full py-3 
                text-white font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"

          />

        </form>
      )}

    </>
  )
}

export default NewPassword