import React, { useEffect, useState ,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmployeeContext } from '../../components/EmployeeContext'
// import DashboardDataBaseAdmin from './SidebarDatabase'
import { StationContext } from '../../components/EmployeeContext'
import MoreDetailsBtn from '../../components/MoreDetailsBtn';


export default function Employee() {

  const { employeeData } = useContext(EmployeeContext);
  const { stationData } = useContext(StationContext);

  console.log("Employeecontext" , EmployeeContext);
  console.log("employeeData  ",employeeData);
  console.log("Station data : ",stationData);

  let navigate = useNavigate()
  const token = localStorage.getItem('token');


  const [query, setQuery] = useState("")
  const [responseData, setResponseData] = useState("");
  const [current_status, SetCurrent_status] = useState(false);
  const [formData, setFormData] = useState({
    CastingData: "",
    });

  const gotoCreation = (e) => {
    navigate("/SideBar/createEmployee")
  }
  const gotoUpdation = (e) => {
    navigate("/SideBar/UpdateEmployee" ,{state : JSON.stringify(formData)} )
  }



   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(`http://localhost:8080/employee/employeedata/${query}?`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();


          if (data.success  === false) {
            setFormData({
              CastingData: ""
              });
  
              SetCurrent_status(data.success)
              setResponseData("");
  
  
            console.log(" ! response ", Error)
  
    
          }else{
           
            SetCurrent_status(data.success)
    
            setFormData({
            CastingData: data.rows[0]
            });
            // all data wrap into castingData
    
            if (current_status === true){
              setResponseData(data.rows[0]);
              console.log(responseData)
              console.log("data send if ", current_status)
            } else {
              console.log("data send else", current_status)
            }
          }




  
      
  
      } catch (Error) {
        console.log("this is catch of try ", Error)
      }
  
    };

  return (
    <>
      {/* <DashboardDataBaseAdmin></DashboardDataBaseAdmin> */}

      <div className="p-4 sm:ml-64"  >
        <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>

          <div className='flex ' >

            <button onClick={gotoCreation} type="button" class=" flex items-center  text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-3 mb-7">
              <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
              </svg>
              <span className="flex-1 text-lg ms-3 whitespace-nowrap">Create Employee</span>
            </button>

            <form class="max-w-md mx-auto" onSubmit={handleSubmit} >
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" value={query} name='query' onChange={(e) => setQuery(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

              </div>
            </form>
          </div>



          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>

                {current_status === true  ? (  
                    <tr class="border-b border-gray-200 dark:border-gray-700">

                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {responseData.EMP_ID}
                      </th>
                      <td class="px-6 py-4 font-medium text-gray-900 ">
                        {responseData.EMP_NAME}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                        {responseData.EMP_RANK}
                      </td>
                      <td class="px-6 py-4 font-medium text-gray-900">
                        {responseData.PHONE_NO}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                        {responseData.ADDRESS}
                      </td>
                      <td class="px-6 py-4 font-medium text-gray-900">
                        {responseData.CNIC}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                        {responseData.START_DATE}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                      <button onClick={gotoUpdation} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">update</button>
                      </td>
                      <td  class="  bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                        <MoreDetailsBtn Qdata = {responseData}  />
                      </td>



                    </tr>
                  )
                  : (

                    <h3>search employee using id in above</h3>

                  )}

              </tbody>
            </table>



            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-lg text-gray-950 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                    ID:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-500 ">
                    NAME:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                    RANK:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-500">
                    PHONE NO:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800 ">
                    ADDRESS:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-500">
                    CNIC:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                    JOINING DATE:
                  </th>
                </tr>
              </thead>


              <tbody>
                {employeeData.map === null ? (
                  <h1>There are no employees</h1>
                ) : (
                  
                    employeeData.map((employee , index ) => (

                    <tr key={index} class="border-b border-gray-200 dark:border-gray-700">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {employee.EMP_ID}
                    </th>
                    <td class="px-6 py-4 font-medium text-gray-900 ">
                      {employee.EMP_NAME}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                      {employee.EMP_RANK}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {employee.PHONE_NO}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                      {employee.ADDRESS}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {employee.CNIC}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                      {employee.START_DATE}
                    </td>


                  </tr>


                    ))
                
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  )
}
