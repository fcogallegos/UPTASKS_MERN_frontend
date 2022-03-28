import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>

      <h1 
        className="text-sky-600 font-black text-center text-5xl capitalize"
      >Manage your <span className="text-slate-700"> projects </span>
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

        <input 
              type="submit"
              value="Sign In"
              className="bg-sky-700 mb-5 w-full py-3 
                  text-white font-bold rounded
                  hover:cursor-pointer hover:bg-sky-800 transition-colors"

        />

      </form>

      <nav className="lg:flex lg:justify-between">
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/register"
            >Don't have an account? <br/> <span className="font-bold">Sign up now!</span></Link>

            <Link
                className="block text-center font-bold my-5 text-slate-500 uppercase text-sm"
                to="/forget-password"
            >Forgot password</Link>
      </nav>

    </>
  )
}

export default Login