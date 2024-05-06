import  {React , useContext} from 'react'
// import DashboardDataBaseAdmin from './SidebarDatabase'
// import { StationContext } from '../../components/StationContext'
import { StationContext } from '../../components/EmployeeContext'


export default function Stations() {

  const { stationData } = useContext(StationContext);


  return (
    <>
    <div className="p-4 sm:ml-64"  >
        <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-lg text-gray-950 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                    Station:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-500 ">
                    Staff:
                  </th>
                  <th scope="col" class="px-6 py-3 bg-blue-400 dark:bg-gray-800">
                    Head Of Station:
                  </th>
                </tr>
              </thead>


              <tbody>
                 {
                  stationData.map === null ? (
                    <h1>There are no employees</h1>
                  ) : (
                    stationData.map((station , index ) => (

                      <tr key={index} class="border-b border-gray-200 dark:border-gray-700">
  
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {station.STATION_NO}
                      </th>
                      <td class="px-6 py-4 font-medium text-gray-900 ">
                        {station.STAFF}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900">
                        {station.HEAD}
                      </td>
                    </tr>
                      )))
                 }
                 
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}
