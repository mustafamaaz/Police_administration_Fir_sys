import React, { useState } from 'react'
import axios from 'axios'

export default function Filessss() {


    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
    const token = localStorage.getItem('token');



    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)
        console.log("image :: " , file);
        console.log("caption :: " , caption);
        // console.log("formData :: " , formData);


      const fileResponse =   await fetch("http://localhost:8080/administration/upload", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData 
  
      })

      
  

      
      console.log("file response : " , fileResponse);
    }

    // axios.post("http://localhost:8080/administration/upload", formData, { headers: {'Content-Type': 'multipart/form-data'}})

    return (
        <div>


            <form onSubmit={submit}  >

                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMP CNIC</label>
                    <input onChange={e => setCaption(e.target.value)} type="text" id="cnic" name='emp_cnic' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456789" required />
                </div>

                <div className="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Employee Pic</label>
                    <input onChange={e => setFile(e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required />
                </div>

                <button type="submit">Submit</button>

            </form>



        </div>
    )
}
