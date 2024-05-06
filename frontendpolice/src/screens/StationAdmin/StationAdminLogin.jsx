import React, { useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';





function StationAdminLogin() {

  let navigate = useNavigate()

   // State to manage form inputs
   const [formData, setFormData] = useState({
    emp_id: "",
    station_no: "",
    password: "",
    });

  const handleSubmit = async(event) => {

    event.preventDefault();
    console.log(" sending",formData) 
    const response = await fetch("http://localhost:8080/login/stationAdmin", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  emp_id: formData.emp_id, password: formData.password, station_no: formData.station_no })

    })
    // console.log("body ",JSON.stringify());
    const json = await response.json()
    console.log(json);
   
    if(json.success){

      navigate("/station/Createfir")

    }else{
      alert(json.errors)
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
      <img className="w-20 h-20 mr-2 mb-5" src='public/policeLogo.png' alt="logo" />

        <div  className="flex items-center mb-6 text-4xl font-semibold text-gray-600 dark:text-white">
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">Police Station Admin</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome
            </h1>



            
            <form  onSubmit={handleSubmit}  className="space-y-4 md:space-y-6" action="#">
           

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Station Admin ID</label>
                <input type="text" id='id' name="emp_id" onChange={handleInputChange } value={formData.emp_id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Station no</label>
                <input type="text" id='no' name="station_no" onChange={handleInputChange } value={formData.station_no} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AA-000" required />
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

export default StationAdminLogin;