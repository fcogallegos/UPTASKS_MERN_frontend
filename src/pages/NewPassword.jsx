import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import clientAxios from '../config/clientAxios';
import Alert from '../components/Alert';


const NewPassword = () => {

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {

        await clientAxios.get(`/users/forget-password/${token}`);

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

  const handleSubmit = async e => {
    e.preventDefault();

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

    try {

      const url = `/users/forget-password/${token}`;

      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false
      })

      setPasswordModified(true);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>

      <h1
        className="text-sky-600 font-black text-center text-5xl"
      >Create new password
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-5 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >

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
            value="Save New Password"
            className="bg-sky-700 mb-5 w-full py-3 
                text-white font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"

          />

        </form>
      )}

      {passwordModified && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        ><span className="font-bold">Sign In.</span></Link>
      )}
    </>
  )
}

export default NewPassword