

import React,{useState , useEffect} from "react";
import { useWeavy, WyFiles } from "@weavy/uikit-react";

export function WeavyComponent() {


//   curl https://{WEAVY-SERVER}/api/users?top=20
// -H "Authorization: Bearer {ACCESS-TOKEN | API-KEY}"



const [users, setUsers] = useState([]);

useEffect(() => {
    // Define a function to fetch the list of users
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://0fa7005414ae4372907db4d4752e24ca.weavy.io/api/users', {
              method: 'GET',
                query: {
                    top: 1,
                    // Add other query parameters as needed
                },
                headers: {
                    'Authorization': 'Bearer wyu_sAjX1lkl0nfYIXGI0qChfT7zI7dxH10mjNZU'
                }
            });
            setUsers(response.data);
            console.log("api hit" , users[0])
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Call the fetchUsers function
    fetchUsers();
}, []); // Empty dependency array ensures the effect runs only once





  useWeavy({
    url: "https://0fa7005414ae4372907db4d4752e24ca.weavy.io",
    tokenFactory: async () => "wyu_sAjX1lkl0nfYIXGI0qChfT7zI7dxH10mjNZU"
  });




  return <WyFiles id="1" onWyFileCreated={(e) => console.log(e.detail)} ></WyFiles>;
}

// import React, { useState } from "react";
// import axios from "axios";

//  function WeavyComponent() {
//   // Initialize state for selected file
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Function to handle file selection
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };
//   // Function to handle file upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       console.error("No file selected!");
//       return;
//     }
//     try {
//       // Create FormData object to send file
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // Make POST request to Weavy API to upload file
//       const response = await axios.post(
//         "https://0fa7005414ae4372907db4d4752e24ca.weavy.io/api/files/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: "Bearer wyu_9KFrcKD9R251WLWl7KqlMC7vQOvTId3L9fpN", // Add your access token here
//           },
//         }
//       );

//       console.log("File uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <WyFiles uid="demouser" />
//     </div>
//   );
// }

// export default WeavyComponent;




// import React, { useState } from 'react';

// function FileUpload() {


//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       console.error("No file selected!");
//       return;
//     }

//     // Create a FormData object to send the file
//     const formData = new FormData();
//     formData.append('file', selectedFile);

 

//   };



//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('https://9vjj24.buildship.run/hello', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         console.log(" ! response ",Error)
//         // throw new Error('Failed to fetch employee data');
//       }
//       const data = await response.json();
//       SetStatus(data.success)

//       // console.log( "this is data 0",data)


//       if ( current_status === true){
//         setResponseData(data.rows[0]);
//         console.log(responseData)
//         console.log("data send if ",current_status)

//       }else{
//         console.log("data send else", current_status)
//       }
    
//     } catch (Error) {
//       console.log("this is catch of try ",Error)
//       // SetStatus("false");
//     }
//   };



//   return (
//     <div>
//       <h2>File Upload</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default FileUpload;

