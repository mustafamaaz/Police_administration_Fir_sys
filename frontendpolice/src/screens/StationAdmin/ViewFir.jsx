import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';

export default function ViewFir() {

    const [query, Setquery] = useState("")
    const [Show, SetIsShow] = useState(false);
    const [renderData, SetRenderData] = useState("")
    const [pic, SetPic] = useState([]);
    const [fir, SetFir] = useState([])


    let navigate = useNavigate()


    const handleToShow = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`http://localhost:8080/thana/ViewFir/${query}?`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            console.log("data is ::   ", data.rows);
            console.log("data is ::   ", data.pic);
            console.log("data is ::   ", data.fir);


            if (data.success) {

                SetIsShow(true);
                SetRenderData(data.rows);
                SetFir(data.fir)
                SetPic(data.pic);


            } else {
                SetIsShow(false);

            }


        } catch (Error) {
            console.log("this is catch of try ", Error)
        }


    }


    const gotoPicPage = (e) => {
        e.preventDefault();
        navigate("/StationPanel/Photo", { state: JSON.stringify(pic) })
    }


    const gotoFirPage = (e) => {
        e.preventDefault();
        navigate("/StationPanel/pdf", { state: JSON.stringify(fir) })
    }








    return (
        <div>

            <div className="p-4 sm:ml-64"  >
                <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>


                    <div className='flex justify-center mb-10'    >
                        <Header head={"FIR View Panel"} />
                    </div>



                    <form onSubmit={handleToShow} class="max-w-md mx-auto mb-10"  >


                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" value={query} name='query' onChange={(e) => Setquery(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter filer CNIC" />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>

                    {Show ? (

                        <div> {renderData ? (

                            renderData.map((data, index) => (

                                <div key={index} class="w-full p-6 bg-white border border-gray-200 rounded-lg  bg-gray-100 shadow dark:bg-gray-800 dark:border-gray-700">

                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-lg text-gray-950 uppercase dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                                                    Name
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-500 ">
                                                    CNIC
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                                                    Mishap Area
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-500">
                                                    Phone
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-500">
                                                    Date
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                                                    Station No
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                                                    Employee Id
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800 ">
                                                    Fir
                                                </th>
                                                <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800 ">
                                                    Pic
                                                </th>
                                            </tr>
                                        </thead>


                                        <tbody>

                                            <tr class="border-b border-gray-200 dark:border-gray-700">

                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                    {data.REGISTERER_NAME}
                                                </th>
                                                <td class="px-6 py-4 font-medium text-gray-900 ">
                                                    {data.CNIC}
                                                </td>
                                                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                                                    {data.MISHAPE_AREA}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900">
                                                    {data.PHONE_NO}
                                                </td>
                                                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                                                    {data.FIR_DATE}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900">
                                                    {data.STATION_NO}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900">
                                                    {data.EMP_ID}
                                                </td>
                                                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                                                    <button onClick={gotoPicPage} target = "_blank" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Click it</button>
                                                </td>
                                                <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                                                    <button onClick={gotoFirPage} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Click it</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>


                            ))

                        ) : (<h3>No Record Found</h3>)}
                        </div>

                    ) : (<h3></h3>)


                    }


                </div>
            </div>
        </div>
    )
}
