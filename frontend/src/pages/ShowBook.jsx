import axios from 'axios'
import React from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams ,Link} from 'react-router-dom'
import {useState,useEffect }from 'react'
import { MdDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'

const ShowBook = () => {



  const {id}=useParams()
  const [loading,setLoading]= useState(true)

  const [book,setBook]=useState({})


  useEffect(()=>{

    axios.get(`https://fullstackbookstore-backned.onrender.com/books/${id}`)
    .then(response=>{
      setBook(response.data);
      setLoading(false)


    }).catch((error)=>{

      console.log(error);
      setLoading(false)

    })

  },[])



  return (
    <div className='bg-purple-300 w-full h-screen p-4 '> 
      <BackButton/>

      <h3 className='text-4xl text-center text-indigo-700'>Book Details</h3>
      {
        loading? <Spinner/>: (
          <div className='bg-purple-300 flex align-middle justify-center p-8 m-8'>

          <div className='p-6 bg-purple-400  inline-block rounded-lg shadow-md shadow-purple-950  '>
          
              <div className='p-2 '>
                <span className='text-2xl'>ID : </span>
                
                <span className='text-xl' >{book._id}</span>
              </div>
              <div>
                <span className='text-2xl'>title : </span>
                <span className='text-xl'>{book.title}</span>
              </div>

              <div>
                <span className='text-2xl'>author : </span>
                <span className='text-xl'>{book.author}</span>
              </div>

              <div>
                <span className='text-2xl'>PublishYear : </span>
                <span className='text-xl' >{book.publishYear}</span>
              </div>
              <div>
                <span className='text-2xl'>CreatedAt : </span>
                <span className='text-xl'>{book.createdAt}</span>
              </div>
              <div>
                <span className='text-2xl'>UpdatedAt : </span>
                <span className='text-xl'>{book.updatedAt}</span>
              </div>

              <div className='p-4 flex flex-row justify-evenly'> 
               <Link to={`/books/delete/${book._id}`}>
               <MdDelete className='text-4xl text-orange-700 '/> 
               </Link>
               <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className='text-4xl text-yellow-600 '/>
               </Link>
 
              </div>
          </div>

          
        </div>
        )


      }

    </div>
  )
}

export default ShowBook
