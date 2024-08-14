import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const CreateBook = () => {

  const [title,setTitle]=useState();
  const [author,setAuthor]=useState();
  const [publishYear,setPublishYear]=useState();
  const [loading,setLoading]=useState();

  const navigate=useNavigate();

  const handleSaveBook=()=>{
    if(
      !title||
      !author||
      !publishYear
    ){
      alert("all three fields are requiered")
      return;
    }

    const data={
      title,
      author,
      publishYear,
    }
    
    setLoading(true);
    
    axios.post('http://localhost:5000/books',data)
    .then(()=>{
      setLoading(false);
      navigate('/')
    }).catch((error)=>{
      setLoading(false)
      console.log(error);
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
          <input type='number' value={publishYear} placeholder='Enter publishYear of book'   class="[&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]" className='p-2 inline outline-none rounded-lg  bg-purple-400 placeholder:text-purple-500 text-xl inner-spin ' min='2000' onChange={(e)=>setPublishYear(e.target.value)}/>
          </div>

          <div className='flex flex-col p-4 bg-purple-900 rounded-lg text-xl'> 
            <button onClick={handleSaveBook}>Save the book</button>
          </div>
          
       </div>
       )
      }


      
      </div>
    
  )
}

export default CreateBook