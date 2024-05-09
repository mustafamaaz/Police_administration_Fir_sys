import React, { useEffect, useState } from "react";
// import FileUpload from "./screens/FileUpload";
// import { useWeavy, WyFiles } from "@weavy/uikit-react";
// import { useWeavy, WyFiles } from "../node_modules/@weavy/uikit-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Landingpage from "./screens/Landingpage";

import DatabaseAdminLogin from "./screens/DatabaseAdmin/DatabaseAdminLogin";
import StationAdminLogin from "./screens/StationAdmin/StationAdminLogin";
// import   WeavyComponent  from "./screens/WeavyComponent";
import Employee from "./screens/DatabaseAdmin/Employee";
import Stations from "./screens/DatabaseAdmin/Stations";
import StationsAdmins from "./screens/DatabaseAdmin/StationsAdmins";
import Dashboard from "./screens/DatabaseAdmin/Dashboard";
import DatabaseAdmins from "./screens/DatabaseAdmin/DatabaseAdmins";
import DatabaseFirs from "./screens/DatabaseAdmin/DatabaseFirs";
import CreateEmployee from "./screens/DatabaseAdmin/CreateEmployee";
import UpdateEmployee from "./screens/DatabaseAdmin/UpdateEmployee";

import AssignDuty from "./screens/DatabaseAdmin/AssignDuty";
import CreateFir from "./screens/StationAdmin/CreateFir";
import CombineLogin from "./screens/DatabaseAdmin/CombineLogin";
import AppLayoutForAdministrator from "./screens/DatabaseAdmin/AppLayoutForAdministrator";
import Filessss from "./screens/DatabaseAdmin/Filessss";
import GetPic from "./screens/DatabaseAdmin/GetPic";
import TransferEmployee from "./screens/DatabaseAdmin/TransferEmployee";
import EmpProfile from "./components/EmpProfile";
import  StationDashboard from "./screens/StationAdmin/Dashboard";

import StationPanelLayout from "./screens/StationAdmin/StaionPanelLayout";

// import {DashboardDataBaseAdmin} from "./screens/DatabaseAdmin/SidebarDatabase"; 



function App() {
  return (


    <BrowserRouter>
      <Routes>


        <Route index exact path="/" element={<Landingpage />} />
        <Route index exact path="/file" element={<Filessss />} />
        <Route index exact path="/getPic" element={<GetPic />} />

        <Route exact path="page/" element={<CombineLogin />} >
          <Route exact path="Stationlogin" element={<StationAdminLogin />} />
          <Route exact path="Administationlogin" element={<DatabaseAdminLogin />} />
        </Route>

        {/*  this is routes of Database admin panel */}
        <Route exact path="/SideBar/" element={<AppLayoutForAdministrator />}>
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="employee" element={<Employee />} />
          <Route exact path="createEmployee" element={<CreateEmployee />} />
          <Route exact path="updateEmployee" element={<UpdateEmployee />} />
          <Route exact path="EmpProfile" element={<EmpProfile />} />

          <Route exact path="DatabaseAdmins" element={<DatabaseAdmins />} />
          <Route exact path="fir" element={<DatabaseFirs />} />
          <Route exact path="stationData" element={<Stations />} />
          <Route exact path="assignDuty" element={<AssignDuty />} />
          <Route exact path="stationsadminData" element={<StationsAdmins />} />
          <Route exact path="Transfer" element={<TransferEmployee />} />
          <Route path="*" element={<div>Default Page Content for /SideBar</div>} />
        </Route>

        {/* this is route of station admin panel */}


        <Route exact path="/StationPanel/" element={ <StationPanelLayout/>}>

        <Route exact path="Stationdashboard" element={<StationDashboard />} />
        {/* <Route exact path="ViewFir" element={<CreateFir/>} />
        <Route exact path="DelFir" element={<CreateFir/>} /> */}
        <Route exact path="CreateFir" element={<CreateFir/>} />
        {/* <Route exact path="KillFir" element={<CreateFir/>} /> */}
        <Route exact path="*" element={<div>Default Page Content not Found any thing</div>} />

        </Route>



      </Routes>


    </BrowserRouter>


  );
}

export default App;
