import React, { useState } from 'react';
import { useNavigate, Link , Outlet } from 'react-router-dom'

// import h from ''
function DatabaseAdminLogin() {

  let navigate = useNavigate()


   // State to manage form inputs
   const [formData, setFormData] = useState({
    database_cnic: "",
    database_id: "",
    database_name: "",
    password: "",
    });

  // Function to handle form submission
  const handleSubmit = async(event) => {

    event.preventDefault();
    // console.log(" sending",formData) 
    const response = await fetch("http://localhost:8080/login/loginAdmin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ database_cnic: formData.database_cnic, database_id: formData.database_id, password: formData.password, database_name: formData.database_name })

    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token',json.authToken)
      // console.log(localStorage.setItem('token',json.authToken));
      navigate("/SideBar/dashboard")

    }
    else {
      alert("Enter Valid Credentials")
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData,[name]: value,
    })
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <img className="w-20 h-20 mr-2 mb-5" src='policeLogo.png' alt="Logo" />

        <div  className="flex items-center mb-6 text-4xl font-semibold text-gray-600 dark:text-white">
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">Police DataBase Admin</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Have an account !
            </h1>



            
            <form  onSubmit={handleSubmit}  className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Database Admin Cnic</label>
                <input type="text" id='text' name="database_cnic" onChange={handleInputChange } value={formData.database_cnic} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456789" required />
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Database Admin ID</label>
                <input type="text" id='id' name="database_id" onChange={handleInputChange } value={formData.database_id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Database Admin Name</label>
                <input type="name" id='nam' name="database_name" onChange={handleInputChange } value={formData.database_name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John doe" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id='pass' name="password" onChange={handleInputChange } value={formData.password} placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

  
              <button type="submit" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-orange-100 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-orange-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-orange-100 dark:text-gray-950 dark:border-gray-600 dark:hover:text-zinc-950 dark:hover:bg-gray-700">Login</button>
            </form>
          </div>
        </div>
      </div>
      <Outlet/>
    </section>
   
  );
}

export default DatabaseAdminLogin;