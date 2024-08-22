import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import axios  from 'axios';

const DeleteBook = () => {
  const {id}=useParams()
  const [loading,setLoading]=useState();
  const [title,setTitle]=useState();
  const navigate=useNavigate();


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://fullstackbookstore-backned.onrender.com/books/${id}`)
    .then((response)=>{

      setTitle(response.data.title)
      console.log(response.data)
      setLoading(false)

    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)

    })
  },[])


  const handleDeleteBook=()=>{

    setLoading(true)

    axios.delete(`http://localhost:5000/books/${id}`)
    .then(()=>{
      setLoading(false)
      navigate('/')
    })
    .catch((error)=>{
      console.log(error)
      console.log("cant delete book")
      navigate('/')
    })

    
    
    
  }


  return (
    <div className='bg-purple-300  h-screen w-full flex flex-col items-center'>
      <h1 className='text-center text-4xl p-2 font-bold '>DeleteBook</h1>
      {
        loading?<Spinner/>:
        <div className='bg-purple-800 p-8 rounded-lg flex flex-col items-center text-4xl' >
          <h1 >Do You Really Delete Book : {title} ?</h1>
          <button className='p-4  bg-red-800 rounded-lg m-5' onClick={handleDeleteBook}>Yes ,Delete

          </button>

        </div>
      }
    </div>

    
  )
}

export default DeleteBook


