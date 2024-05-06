import React ,{useEffect, useState} from "react";
import { Outlet,useHistory, useNavigate  } from 'react-router-dom';
import EmployeeProvider from "../../components/EmployeeContext";
import DashboardDataBaseAdmin from "./SidebarDatabase";

export default function AppLayoutForAdministrator() {

    const [isLogIn, SetisLogIn] = useState(false);

    const navigate = useNavigate();


    // const handleSubmit = async(event) => {

    //   const response = await fetch("http://localhost:8080/employee/updateEmployees", {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
  
    //     },
    //     body: JSON.stringify({ emp_cnic: updateData.emp_cnic, emp_id: updateData.emp_id, emp_name: updateData.emp_name, emp_rank: updateData.emp_rank ,  emp_address: updateData.emp_address , emp_phone_no: updateData.emp_phone_no  })
  
    //   })



    // }





    
    const checkToken = () =>{
      // e.preventDefault();

      const token = localStorage.getItem('token')


      if (!token || token === 'undefined') {
        SetisLogIn(false);
      }else
      SetisLogIn(true);
    }

    useEffect(() => {
      checkToken();
    }, [isLogIn]);
  
    
    
  return (
    <div>
      <EmployeeProvider>
     <DashboardDataBaseAdmin/>
     <Outlet />
     </EmployeeProvider>    
   </div>
  )
}



