import React ,{ useState , useEffect } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'


export default function UpdateEmployee() {

  let navigate = useNavigate();
  const location = useLocation();

  const renderData = JSON.parse(location.state);
  const ReadyToRender = renderData.CastingData;


  const [updateData, setupdateData] = useState({
    emp_cnic: "",
    emp_id: "",
    emp_name: "",
    emp_rank: "",
    emp_address: "",
    emp_phone_no: "",
    });

  


    const handleSubmit = async(event) => {
      const token = localStorage.getItem('token');
      event.preventDefault();
      // console.log(" sending",updateData) 
      const response = await fetch("http://localhost:8080/employee/updateEmployees", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({ emp_cnic: updateData.emp_cnic, emp_id: updateData.emp_id, emp_name: updateData.emp_name, emp_rank: updateData.emp_rank ,  emp_address: updateData.emp_address , emp_phone_no: updateData.emp_phone_no  })
  
      })

      const json = await response.json()
      if (json.success) {
        // console.log(updateData); 
       alert(`Employee added  successfully :${updateData.emp_name}`)
        navigate("/SideBar/employee")

        console.log(json.success)
  
      }
      else {
        alert(`Employee added  error : ${updateData.emp_name}`)
        console.log(json.success)
      }    
    };
  
    // Function to handle input changes
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setupdateData({...updateData,[name]: value,
      })
    };

    useEffect(() => {
      // Update form data with props data when component mounts
     
      setupdateData({

        emp_cnic: ReadyToRender.CNIC,
        emp_id: ReadyToRender.EMP_ID,
        emp_name: ReadyToRender.EMP_NAME,
        emp_rank: ReadyToRender.EMP_RANK,
        emp_address: ReadyToRender.ADDRESS,
        emp_phone_no: ReadyToRender.PHONE_NO,
  
      })

      },[]); // Run effect only when dataFromOtherPage changes
  
  


  return (
    <div>

<div style={{ margin: '0 auto', backgroundColor: '#0377fc', height: '60px', width: '20%', borderRadius: '10px' , marginTop:'30px' }}>
  <h1 style={{ textAlign: 'center', padding: '15px' , fontSize:'20px' }}>{updateData.emp_id}</h1>
</div>


        <hr class="w-48 h-1 mx-auto my-4 bg-blue-400 border-0 rounded md:my-10 dark:bg-blue-700"/>


       <form  onSubmit={handleSubmit} class="max-w-sm mx-auto mt-10">

        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP NAME</label>
          <input type="name" onChange={handleInputChange}  value={updateData.emp_name} name='emp_name' id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="NAME" required />
        </div>

        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP RANK</label>
          <input type="text" id="rank" onChange={handleInputChange}  value={updateData.emp_rank} name='emp_rank' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
        </div>

        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP PHONE NO</label>
          <input type="text" id="no" onChange={handleInputChange}  value={updateData.emp_phone_no} name='emp_phone_no' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456789" required />
        </div>

        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP ADDRESS</label>
          <input type="text" id="addr" onChange={handleInputChange}  value={updateData.emp_address} name='emp_address' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="ETC" required />
        </div>

        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP CNIC</label>
          <input type="text" id="cnic" onChange={handleInputChange}  value={updateData.emp_cnic} name='emp_cnic' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456789" required />
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Employee</button>
      </form> 


    </div>
  )
}
