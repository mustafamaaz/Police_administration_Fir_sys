import React , {useEffect , useState} from 'react'
// const { imageUrl} = post;

export default function GetPic() {

// const [imageUrl , setImageUrl] = useState([]);
const token = localStorage.getItem('token');



  //   useEffect(() => {


  //  async function getPostRequest (event){
  //       // event.preventDefault()

  //     const fileResponse =   await fetch("http://localhost:8080/administration/upload", {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })

   

  //   console.log("file response is :: " , fileResponse);

  //     const data = await fileResponse.json();

  //     console.log("after json response is :: ", data);
     

  //     console.log(" files is imageUrl is  ::", data.imageUrl);

  //        setImageUrl (data.imageUrl)
      
  //   }

  //   getPostRequest();



  //     }, []);
    
    




  return (
    <div>

{/* <img className='rounded' width="430" height="760" src={imageUrl} /> */}














    </div>
  )
}
