import { Link } from "react-router-dom"



const ForgetPassword = () => {
  return (
    <>

      <h1
        className="text-sky-600 font-black text-center text-5xl"
      >Forgot password
      </h1>

      <form className="my-5 bg-white shadow rounded-lg p-10">

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