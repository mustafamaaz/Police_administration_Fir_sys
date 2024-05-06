import { React, useContext, useState } from 'react'
import { StationContext } from '../../components/EmployeeContext'
import { useNavigate} from 'react-router-dom'


export default function AssignDuty() {

    const { stationData } = useContext(StationContext);
    let navigate = useNavigate()
    const [data , setdata] = useState({
        thana_no: "",
        emp_id: "",
    })


    const handleSubmit = async(event) => {
        const token = localStorage.getItem('token');
        event.preventDefault();
      
        const response = await fetch("http://localhost:8080/administration/assignduties", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ thana_no: data.thana_no , emp_id : data.emp_id  })
    
        })

       
  
        const json = await response.json()
        console.log(" condition ",json.success)
        if (json.success) {
         alert(`Employee added  successfully :${data.emp_id}`)
          navigate("/SideBar/employee")
          console.log(json.success)
        }
        else {
          alert(`Employee added  error : ${data.emp_id} ${json.errors} `)
          console.log( json.errors)
        }    
      };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setdata({...data,[name]: value,
        })
      };




    return (
        <div>
            <div className="p-4 sm:ml-64 m-4"  >
                <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700  `}>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg  p-6 ">

                        <div style={{ textAlign: 'center', fontWeight: 'bolder', fontStyle: 'italic', paddingBottom: '20px', fontSize: '38px' }} > ASSIGN DUTY </div>

                        <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Station</label>
                            <select onChange={handleInputChange} name='thana_no' value={data.thana_no} id="countries"  class=" p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {
                                    stationData.map === null ? (<h1>There are no employees</h1>) : (
                                        stationData.map((station, index) => (
                                            <option> {station.STATION_NO}</option>
                                        )))}
                            </select>


                            <div class="mb-5 mt-5">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emp Id</label>
                                <input value={data.emp_id} onChange={handleInputChange} type="numaric" name='emp_id' id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="EMP000" required />
                            </div>

                            <button type="submit" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white-100 focus:outline-none bg-gray rounded-lg border border-gray-100 hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-orange-100 dark:text-gray-950 dark:border-gray-100 dark:hover:text-zinc-950 dark:hover:bg-gray-700">Confirm</button>


                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
