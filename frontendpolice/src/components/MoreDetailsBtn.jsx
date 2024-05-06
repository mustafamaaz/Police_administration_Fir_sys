import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function MoreDetailsBtn({ Qdata }) {
  let navigate = useNavigate()


  let data;

  const gotoProfile = async (e) => {

    try {

      console.log("api hit point ");
      console.log("query : ", Qdata.EMP_ID);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/employee/record/${Qdata.EMP_ID}?`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      data = await response.json();



      if (data.success === false) {
      } else {
      }

    } catch (Error) {
      console.log("this is catch of try ", Error)
    }


    const combinedData = {
      Qdata: Qdata,
      history: data.history,
      current_station : data.current_station
    };


    console.log("click btn ");
    e.preventDefault();
    navigate("/SideBar/EmpProfile", { state: JSON.stringify(combinedData) })


    console.log("current station is " , data.current_station);
    console.log("history is  " , data.history);
    console.log("Qdata is  " , Qdata);



  }

 

  // useEffect(() => {

  //   console.log(" .................in useEffect " , AllInfo);

  // }, [AllInfo])




  return (
    <div>
      <Link onClick={gotoProfile} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">More Details</Link>
    </div>
  )
}
