import React, { useState } from 'react'
import { useNavigate,  } from 'react-router-dom'
import Spinner from '../../components/Spinner'


export default function CreateFir() {


  const [isLoading, setIsLoading] = useState(false);
  const [Pic, setPic] = useState()
  const [Fir, setFir] = useState()


  const emp_id = localStorage.getItem("emp_id")
  const station_no = localStorage.getItem("station_no")


  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    mishap_area: "",
    phone_no: "",
  });



  const handleSubmit = async (event) => {

    setIsLoading(true)
    event.preventDefault();

    console.log("emp info ", emp_id , " " , station_no );

    const CombinedFormData = new FormData();
    CombinedFormData.append("Pic", Pic)
    CombinedFormData.append("Fir", Fir)
    CombinedFormData.append("cnic", formData.cnic)
    CombinedFormData.append("name", formData.name)
    CombinedFormData.append("mishap_area", formData.mishap_area)
    CombinedFormData.append("phone_no", formData.phone_no)
    CombinedFormData.append("EMP_ID", emp_id)
    CombinedFormData.append("STATION_NO", station_no)





    const response = await fetch("http://localhost:8080/thana/CreateFirs", {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`

      },
      body: CombinedFormData
    })

    const json = await response.json()
    if (json.success) {
      setIsLoading(false)
      alert(json.message)
    }
    else {
      alert(json.err)
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value,
    })
  };




  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.type !== 'application/pdf') {
  //       e.target.value = ''; // Clear the input
  //       alert('Please select a PDF file.');
  //     }
  //   }
  // }


  return (
    <>

      {isLoading === true ? (

        <Spinner />

      ) : (


        <div className="p-4 sm:ml-64"  >
          <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700   `}>


            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">


              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filer Name</label>
                <input type="text" id='name' onChange={handleInputChange} value={formData.name} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filer CNIC</label>
                <input type="text" id='cnic' onChange={handleInputChange} value={formData.cnic} name="cnic" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filer Phone No</label>
                <input type="text" id='phone no' onChange={handleInputChange} value={formData.phone_no} name="phone_no" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mishap Area</label>
                <input type="text" id='area' onChange={handleInputChange} value={formData.mishap_area} name="mishap_area" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMP000" required />
              </div>

              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload FIler Pic</label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
                  onChange={e => setPic(e.target.files[0])} id="file_input" type="file" required />
              </div>


              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Fir</label>
              <input type="file"
                id="pdfInput"
                accept=".pdf"
                // onChange={handleFileChange}
                onChange={e => setFir(e.target.files[0])}
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" required />


              <button type="submit" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-orange-100 focus:outline-none bg-gray-400 rounded-lg border border-gray-200 hover:bg-orange-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-orange-100 dark:text-gray-950 dark:border-gray-600 dark:hover:text-zinc-950 dark:hover:bg-gray-700">Create</button>
            </form>

          </div>
        </div>
      )}




    </>
  )
}
