import React, { useEffect , useState } from 'react'
import {  useLocation } from 'react-router-dom'
import Skeleton from './Skeleton';


export default function EmpProfile() {

    const [imageUrl , setImageUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const location = useLocation();
    const seperate = JSON.parse(location.state);

    const renderData = seperate.Qdata;
    const history = seperate.history;
    const cr_station = seperate.current_station
    let data;


    useEffect(() => {


        const handleProfilePic = async (e) => {

            console.log("image path is ", renderData.IMAGE);

            try {


                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/administration/upload/${renderData.IMAGE}?`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                data = await response.json();



                if (data.success === false){
                    setImageUrl ("")
                    console.log("path is not correct");
                    setIsLoading(false);
                } else {

                    setImageUrl (data.imageUrl)
                    console.log("image is loading........");
                    setIsLoading(false);
                }

            } catch (Error) {
                console.log("this is catch of try ", Error)
                setIsLoading(true);
            }
        }

        handleProfilePic();


    }, [])








    return (
        <div>


            <div className="p-4 sm:ml-64"  >
                <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>

{  isLoading === true ? (

   <Skeleton/>

):(
<div>






{console.log("emp pic is  ::   " ,imageUrl )}

<div class="flex justify-center mt-5 mb-10">
                        {/* <img  src="https://source.unsplash.com/random/900×700/?fruit" alt="Extra large avatar" /> */}
                        <img className='rounded' class="rounded w-60 h-45"   src={imageUrl} />
                    </div>


                    <div className='mt-10 mb-20' >

                        <div class="flex items-center justify-center">
                            <div class="relative inline-block">
                                <span class="text-2xl md:text-3xl font-bold">
                                    General Info of EMP1223
                                </span>
                                <span class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-sky-600 rounded-full"></span>
                            </div>
                        </div>



                        <div class="relative overflow-x-auto rounded-lg  mt-8 ">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400   ">
                                <thead class="text-lg text-gray-900 uppercase  bg-blue-500 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Employee Id
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Employee Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Station NO
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Rank
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Phone No
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            CNIC
                                        </th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    <tr class="bg-slate-400 border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {renderData.EMP_ID}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {renderData.EMP_NAME}
                                        </th>
                                        <td class="px-6 py-4">
                                         {  !cr_station ? ( <h3>not working</h3>  ) : (cr_station.STATION_NO)  }
                                        </td>
                                        <td class="px-6 py-4">
                                            {renderData.EMP_RANK}
                                        </td>
                                        <td class="px-6 py-4">
                                            {renderData.PHONE_NO}
                                        </td>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {renderData.ADDRESS}
                                        </th>

                                        <td class="px-6 py-4">
                                            {renderData.CNIC}
                                        </td>



                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>









                    <div className='mt-3 mb-10' >

                        <div class="flex items-center justify-center">
                            <div class="relative inline-block">
                                <span class="text-2xl md:text-3xl font-bold">
                                    Station Record of EMP1223
                                </span>
                                <span class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-sky-600 rounded-full"></span>
                            </div>
                        </div>



                        <div class="relative overflow-x-auto rounded-lg  mt-8 ">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400   ">
                                <thead class="text-lg text-gray-900 uppercase  bg-blue-500 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Employee Id
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Station NO
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Joining Date
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Closing date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody  >

                                    {!history ? (<h2>No Station Record Found for this EMp</h2>) : (

                                        history.map((record, index) => (

                                            <tr class="bg-slate-400 border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {record.EMP_ID}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {record.STATION_NO}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {record.START_DATE}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {record.END_DATE}
                                                </td>
                                            </tr>


                                        )))}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
)}
                </div>
            </div>
        </div>
    )}
