import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';


export default function CreateEmployee() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate()


  const [formData, setFormData] = useState({
    emp_cnic: "",
    emp_id: "",
    emp_name: "",
    emp_rank: "",
    emp_address: "",
    emp_phone_no: "",
  });

  const [file, setFile] = useState()



  const handleSubmit = async (event) => {
    setIsLoading(true)
    const token = localStorage.getItem('token');
    event.preventDefault();



    const CombinedFormData = new FormData();
    CombinedFormData.append("image", file)
    CombinedFormData.append("emp_cnic", formData.emp_cnic)
    CombinedFormData.append("emp_id", formData.emp_id)
    CombinedFormData.append("emp_name", formData.emp_name)
    CombinedFormData.append("emp_rank", formData.emp_rank)
    CombinedFormData.append("emp_address", formData.emp_address)
    CombinedFormData.append("emp_phone_no", formData.emp_phone_no)


    const response = await fetch("http://localhost:8080/employee/createemployee", {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: CombinedFormData
      // JSON.stringify({ emp_cnic: formData.emp_cnic, emp_id: formData.emp_id, emp_name: formData.emp_name, emp_rank: formData.emp_rank ,  emp_address: formData.emp_address , emp_phone_no: formData.emp_phone_no  })
    })

    const json = await response.json()
    if (json.success) {
      setIsLoading(false)
      // console.log(formData); 
      alert(`Employee added  successfully :${formData.emp_name}`)
      navigate("/SideBar/employee")

    }
    else {
      setIsLoading(false)
      alert(`Employee added  error : ${formData.emp_name}`)
    }


  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value,
    })
  };



  return (
    <div>

      {isLoading === true ? (

        <Spinner />

      ) : (
        <div>

          <form onSubmit={handleSubmit} class="max-w-sm mx-auto mt-10">

            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP ID</label>
              <input type="numaric" onChange={handleInputChange} value={formData.emp_id} name='emp_id' id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="EMP000" required />
            </div>

            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP NAME</label>
              <input type="name" onChange={handleInputChange} value={formData.emp_name} name='emp_name' id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
            </div>

            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP RANK</label>
              <input type="text" id="rank" onChange={handleInputChange} value={formData.emp_rank} name='emp_rank' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
            </div>

            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP PHONE NO</label>
              <input type="text" id="no" onChange={handleInputChange} value={formData.emp_phone_no} name='emp_phone_no' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456789" required />
            </div>

            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP ADDRESS</label>
              <input type="text" id="addr" onChange={handleInputChange} value={formData.emp_address} name='emp_address' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="ETC" required />
            </div>

            <div class="mb-5">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP CNIC</label>
              <input type="text" id="cnic" onChange={handleInputChange} value={formData.emp_cnic} name='emp_cnic' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456789" required />
            </div>

            <div className="mb-5">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Employee Pic</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" onChange={e => setFile(e.target.files[0])} id="file_input" type="file" required />
            </div>




            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new employee</button>
          </form>






        </div>
      )}




    </div>
  )
}
