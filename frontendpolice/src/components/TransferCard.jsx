import React, { useContext, useState , useEffect } from 'react'
import { StationContext } from './EmployeeContext'
import { useNavigate} from 'react-router-dom'

export default function TransferCard(props) {

    const { stationData } = useContext(StationContext);
    let navigate = useNavigate()

    const [selected, setSelected] = useState("");
    const token = localStorage.getItem('token');




    const handleToTransfer = async (e) => {
        e.preventDefault();


        if(props.Data.emp_station === selected){

            alert(`You are transfering this EMP at same Station Please change staion No`) 

        }else{

            try {
                const response = await fetch(`http://localhost:8080/administration/TransferData`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },body : JSON.stringify({ station:selected , emp_id:props.Data.emp_id})
                });
    
                const data = await response.json();
    
    
                if (data.success === false) {
             alert(`Error in transfering of this employee`)               
    
                } else {
    
                    alert(`Successfully Transfer`);
                    navigate("/SideBar/employee")  
    
                }
    
    
            } catch (Error) {
                console.log("this is catch of try ", Error)
            }
        }
    }







    const handleInputChange = (event) => {
       const choose =  event.target.value;
      setSelected(choose)
      console.log("event ",  event.target.value);
    }


    useEffect(() => {
        console.log("Selected value changed: ", selected);
    }, [selected]);


//  next thing is that we send this station no to server so that it will remove the row of this emp with previous station num and add new row with updated (selected) station number and with new date 
// and after this it will new station number with all detail it send to assign duty table and previous record of this emp is send to station record

    return (
        <div>



            <div class="flex justify-between mt-10 ">

                <div class="w-1/2 mr-5 ml-10 ">

                    <div style={{ textAlign: 'center', fontWeight: 'bolder', fontStyle: 'italic', paddingBottom: '20px', fontSize: '38px' }} > Current </div>


                    <form class="max-w-sm mx-auto mt-10">

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP ID</label>
                            <input type="name" value={props.Data.emp_id} readOnly name='emp_id' id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
                        </div>

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP NAME</label>
                            <input type="name" name='emp_name' id="name" value={props.Data.emp_name} readOnly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
                        </div>

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP RANK</label>
                            <input type="text" id="rank" value={props.Data.emp_rank} name='emp_rank' readOnly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>


                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Working Station</label>
                            <input type="text" value={props.Data.emp_station} readOnly id="cnic" name='emp_station' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Date</label>
                            <input type="text" id="cnic" value={props.Data.start_date} readOnly name='start_date' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>


                    </form>

                </div>




                <div class="w-1/2 ml-5">

                    <div style={{ textAlign: 'center', fontWeight: 'bolder', fontStyle: 'italic', paddingBottom: '20px', fontSize: '38px' }} > Transfer  </div>

                    <form onSubmit={handleToTransfer}  class="max-w-sm mx-auto mt-10">

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP ID</label>
                            <input type="name" value={props.Data.emp_id} readOnly name='emp_id' id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
                        </div>

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP NAME</label>
                            <input type="name" name='emp_name' id="name" value={props.Data.emp_name} readOnly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
                        </div>

                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP RANK</label>
                            <input type="text" id="rank" value={props.Data.emp_rank} name='emp_rank' readOnly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>


                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Station For Transfer</label>
                        <select onChange={handleInputChange} value={selected} name='selected' id="countries" class=" p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {
                                stationData === null ? (<h1>There are no employees</h1>) : (
                                    ["Choose station", ...stationData.map((station, index) => station.STATION_NO)].map((station, index) => (
                                        <option key={index} value={station}> {station} </option>
                                    )))
                            }
                        </select>


                        <button type="submit" class=" mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm Transfer</button>
                    </form>

                </div>
            </div>








        </div>
    )
}
