import React, { useContext, useState, useEffect } from 'react'
// import DashboardDataBaseAdmin from './SidebarDatabase'
import { StationContext } from '../../components/EmployeeContext'



export default function StationsAdmins() {



  const { stationData } = useContext(StationContext);
  const [successMsg, SetsuccessMsg] = useState({
    msg1: "",
    status: false
  })

  const [successMsg2, SetsuccessMsg2] = useState({
    msg2: "",
    status: "false"
  })

  const [EmpSearch, SetEmpSearch] = useState({
    emp_id: "",
    station: ""
  })
  const [StationSearch, SetStationSearch] = useState({
    emp_id: "",
    station: ""
  })
  const [formData, setFormData] = useState({
    emp_id: "",
    station_no: "",
    password: "",
  });






  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');

    event.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/administration/createStaionAdmin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({ emp_id: formData.emp_id, station_no: formData.station_no, password: formData.password })

      })

      const json = await response.json()
      const DataStation_no = json.DataStation_no;
      const DataEmp_id = json.DataEmp_id;



      console.log("Emp data", DataEmp_id, "station data", json.DataStation_no);


      if (json.success) {

        setFormData({
          emp_id: "",
          station_no: "",
          password: "",
        })

        SetEmpSearch({
          emp_id:'new',
          station:'new'
        })
      }
      else {
        //  if already present admin for station

        if (!json.DataEmp_id || json.DataEmp_id.length === 0) {
          SetEmpSearch({
            emp_id: "",
            station: ""
          });
          console.log("DataEmp_id is undefined or empty");
        } else {
          console.log("DataEmp_id is not empty, accessing its properties...");
          SetEmpSearch({
            emp_id: json.DataEmp_id[0].EMP_ID,
            station: json.DataEmp_id[0].STATION_NO
          });
        }

        if (!json.DataStation_no || json.DataStation_no.length === 0) {
          SetStationSearch({
            emp_id: "",
            station: ""
          });

          console.log("DataStation_no is undefined or empty");
        } else {
          console.log("DataStation_no is not empty, accessing its properties...");
          SetStationSearch({
            emp_id: json.DataStation_no[0].EMP_ID,
            station: json.DataStation_no[0].STATION_NO
          });
        }


        if (!json.DataStationAdmin || json.DataStationAdmin.length === 0) {
          console.log("already this combination is not exist");
        } else {
          console.log("already this combination is exist");
          SetEmpSearch({
            emp_id: "m",
            station: "m"
          });

          SetStationSearch({
            emp_id: "m",
            station: "m"
          });
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }




  };




  useEffect(() => {

    if (EmpSearch.emp_id === "new" && EmpSearch.station === "new") {
      SetsuccessMsg({
        msg1: `this employee ${formData.emp_id} is now admin of this station ${formData.station_no} .......... Successfully!`
      })
    }
    else if (EmpSearch.emp_id === "m" && EmpSearch.station === "m") {
      SetsuccessMsg({
        msg1: `this employee ${formData.emp_id} is already admin of this station ${formData.station_no}`
      })
    }
    else if (EmpSearch.emp_id !== "" && EmpSearch.station !== "") {
      SetsuccessMsg({
        ...successMsg,
        msg1: `This Employee ${EmpSearch.emp_id} is Already Admin of this Station ${EmpSearch.station}`
      });
    } else if (EmpSearch.emp_id === "" && EmpSearch.station === "") {
      SetsuccessMsg({
        msg1: `this employee ${formData.emp_id} not found`
      })
    }



  }, [EmpSearch]);


  useEffect(() => {

    if (StationSearch.emp_id === "m" && StationSearch.station === "m") {
      SetsuccessMsg2({
        msg2: `this station ${formData.station_no} has already ${formData.emp_id} admin`
      })
    }
    else if (StationSearch.emp_id !== "" && StationSearch.station !== "") {
      SetsuccessMsg2({
        ...successMsg2,
        msg2: `This Station ${StationSearch.station} has already Admin ${StationSearch.emp_id}`
      });
    } else if (StationSearch.emp_id === "" && StationSearch.station === "") {
      SetsuccessMsg2({
        msg2: `this station ${formData.station_no} has no admin `
      })
    }
  }, [StationSearch]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value,
    })
  };

  return (
    <>

      <div className="p-4 sm:ml-64 m-4">
        <div className={`p-4 border-2   border-gray-600 border-dashed rounded-lg dark:border-black-900  `}>
          <div class="relative  overflow-x-auto shadow-md sm:rounded-lg  p-6  bg-blue-200 ">

          <div style={{ textAlign: 'center', fontWeight: 'bolder', fontStyle: 'italic', paddingBottom: '20px', fontSize: '38px' }} > CREATE STATION ADMINS </div>


            {
              EmpSearch.emp_id === "" || EmpSearch.station === "" ? (
                <h1></h1>
              ) : (

                EmpSearch.emp_id === "new" && EmpSearch.station === "new" ?(
                  <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                  <span class="font-medium">{successMsg.msg1}</span> 
                </div>

                ): successMsg.msg1 !== "" && successMsg2.msg2 !== "" ? (
                  <div>
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{successMsg.msg1}</span>
                      </div>

                      <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{successMsg2.msg2}</span>
                      </div>
                  </div>


                ) : (
                  <h2></h2>
                )
              )


            }
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-sm mx-auto">

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID</label>
                <input type="text" id='id' onChange={handleInputChange} name="emp_id" value={formData.emp_id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Station</label>
              <select onChange={handleInputChange} name='station_no' value={formData.station_no} id="countries" class=" p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                  stationData.length === 0 ? (<h1>There are no station</h1>) : (
                    stationData.map((station, index) => (
                      <option key={index} value={station.STATION_NO}  > {station.STATION_NO}</option>
                    )))}
              </select>


              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id='pass' onChange={handleInputChange} name="password" value={formData.password} placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <button type="submit" onClick={() => { SetsuccessMsg({ status: true }) }} className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white-100 focus:outline-none bg-gray rounded-lg border border-gray-100 hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-orange-100 dark:text-gray-950 dark:border-gray-100 dark:hover:text-zinc-950 dark:hover:bg-gray-700">Confirm</button>

            </form>
          </div>
        </div>
      </div>

    </>
  )
}
