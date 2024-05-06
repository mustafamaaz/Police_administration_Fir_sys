import React, { createContext, useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom'

// Create context
export const EmployeeContext = createContext();
export const StationContext = createContext();


// Create context provider
 const EmployeeProvider = ({ children }) => {

  let navigate = useNavigate()

  const [IsLoginIn, SetIsLoginIn] = useState(false)

  const [employeeData, setEmployeeData] = useState([]);
  const [stationData, setstationData] = useState([]);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const EmployeeResponse = await fetch("http://localhost:8080/employee/getemployeedata", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await EmployeeResponse.json(); 
      if(json.Position === false){
        SetIsLoginIn(false);
        console.log("this is set as login or logout" , IsLoginIn);
        navigate("/");
      }else{
        SetIsLoginIn(true);
        if (json.success) {
          setEmployeeData(json.EmployeeData);
        }
      }



      const Stationresponse = await fetch("http://localhost:8080/administration/getpoliceStation", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const stationDetails = await Stationresponse.json();
      if (stationDetails.success) {
        setstationData(stationDetails.stations);
      }



    } catch (error) {
      console.error("Error fetching employee details and station details from context api:", error);
    }
  };



  





  useEffect(() => {
   
    fetchData();

  }, [IsLoginIn]);




  return (
    <>
    {
      IsLoginIn ?(

<EmployeeContext.Provider value={{ employeeData }}>
      <StationContext.Provider value={{ stationData }}>
        {children}
      </StationContext.Provider>
    </EmployeeContext.Provider>


     

      ):( null )
    }
   </>
  );
};


export default EmployeeProvider;