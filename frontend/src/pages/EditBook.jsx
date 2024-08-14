import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';




const EditBook = () => {
  const {id}=useParams();
  const [title,setTitle]=useState();
  const [author,setAuthor]=useState();
  const [publishYear,setPublishYear]=useState();
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()




  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
    .then((response)=>{
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)


    })
    .catch((error)=>{
      console.log(error)
      console.log('error during fectching data  in EditBook')
      setLoading(false)

    })

    
    


  },[])
  const handleEditBook=()=>{
    if(!title||!author||!publishYear){alert("all three fields requiered") 
      return;
    }

    const data={
      title,
      author,
      publishYear
    }

    axios.put(`http://localhost:5000/books/${id}`,data)
    .then(()=>{
      console.log("book updated sucessfully")
      navigate('/')
    }).catch((error)=>{
      console.log(error)
      navigate('/')
    })





  }

  return (
    <div  className='bg-purple-300 h-screen flex flex-col items-center' >
      <BackButton/>
      <h1 className='text-center text-4xl p-2 font-bold '>Create Book</h1>

      {
        loading?(<Spinner/>):
        (<div className='flex flex-col w-2/5 p-8'>
          <div className='flex flex-col p-4 gap-2'>
            <label htmlFor="title" className='text-2xl text-purple-700'>Enter the title</label>
            <input type='text' id='title' value={title}  placeholder='Enter title of book' className='p-2 inline outline-none rounded-lg  bg-purple-400 placeholder:text-purple-500 text-xl'  onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className='flex flex-col p-4 gap-2'>
          <label htmlFor="author" className='text-2xl text-purple-700'>Enter the author name</label>
          <input type='text' value={author} placeholder='Enter author name of book' className='p-2 inline outline-none rounded-lg  bg-purple-400 placeholder:text-purple-500 text-xl' onChange={(e)=>setAuthor(e.target.value)}/>
          </div>
          <div className='flex flex-col p-4 gap-2'>
          <label htmlFor="publishYear" className='text-2xl text-purple-700'>Enter the publishYear</label>
          <input type='number' value={publishYear} placeholder='Enter publishYear of book'   className='p-2 inline outline-none rounded-lg  bg-purple-400 placeholder:text-purple-500 text-xl inner-spin ' min='2000' onChange={(e)=>setPublishYear(e.target.value)}/>
          </div>

          <div className='flex flex-col p-4 bg-purple-900 rounded-lg text-xl'> 
            <button onClick={handleEditBook}>Edit the book</button>
          </div>
          
       </div>
       )
      }


      
      </div>
    
  
  )
}

export default EditBook