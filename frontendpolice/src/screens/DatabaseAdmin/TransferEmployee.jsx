import React, { useState } from 'react'
import TransferCard from '../../components/TransferCard'
import Header from '../../components/Header'

export default function TransferEmployee() {
    const token = localStorage.getItem('token');
    const [Show, SetShow] = useState(false)
    const [query, Setquery] = useState("")
    const [Before, SetBefore] = useState({
        emp_id: "",
        emp_station: "",
        start_date: "",
        emp_name:"",
        emp_rank:""
    })




    const handleToShow = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/administration/EmpId/${query}?`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();


            if (data.success === false) {

                alert(`${data.Message}`);

            } else {


                const latestRow = data.WorkingDetails[0];
                const dateString = latestRow.START_DATE;
                const timestamp = new Date(dateString);
                const nextDayTimestamp = new Date(timestamp);
                nextDayTimestamp.setDate(timestamp.getDate() + 1);
                const nextDayISOString = nextDayTimestamp.toISOString();
                const nextDayDate = nextDayISOString.split('T')[0];

                SetBefore({
                    emp_id: latestRow.EMP_ID,
                    emp_station: latestRow.STATION_NO,
                    start_date: nextDayDate,
                    emp_name : latestRow.EMP_NAME,
                    emp_rank : latestRow.EMP_RANK
                })

                console.log();
                SetShow(true)
                alert(`${data.Message}`);
            }


        } catch (Error) {
            console.log("this is catch of try ", Error)
        }


    }


    return (


        <div>

            {/* <div className="p-4 sm:ml-64 m-4"  >
                <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700  `}>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg  p-6 "> */}


            <div className='flex justify-center mb-10'    >
                <Header head={"Transfer Panel"} />
            </div>


            <form onSubmit={handleToShow} class="max-w-md mx-auto"  >
                <div style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: '20px' }} > Enter Employee Id </div>


                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" value={query} name='query' onChange={(e) => Setquery(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            {Show ? (
                <TransferCard Data={Before} />
            ) : (<h1></h1>)
            }



        </div>


        //         </div>
        //     </div>
        // </div>

    )
}
