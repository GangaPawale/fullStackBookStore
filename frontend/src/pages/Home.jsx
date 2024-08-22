import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineDelete } from 'react-icons/md';
import {Link }from 'react-router-dom'
import { CgAdd } from "react-icons/cg";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);


    axios.get('https://fullstackbookstore-backned.onrender.com')
      .then(response => {
        console.log("API response:", response.data);
        setBooks(response.data);
        if (Array.isArray(books)) {
          console.log("book is array ")
        }
        console.log(books.length)

      })
      .catch((error) => {
        console.error("API error:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div>No books available.</div>;
  }

  return (
    <div className="border p-4 border-green-400 bg-purple-300 h-screen">
      <h2 className='text-center text-4xl text-purple mb-3'>Books List</h2>
      <table className="p-4 border-2 border-green-700 w-full">
        <thead className="p-4 border-2 border-green-700 border-">
          <tr>
            <th className="p-2 border-2 border-green-700 border-">No.</th>
            <th className="p-2 border-2 border-green-700 border-">Book Title</th>
            <th className="p-2 border-2 border-green-700 border-">Book Author</th>
            <th className="p-2 border-2 border-green-700 border-">Publish Year</th>
            <th className="p-2 border-2 border-green-700 border-">Created At</th>
            <th className="p-2 border-2 border-green-700 border-">Updated At</th>
          </tr>
        </thead>
        <tbody className="p-2 border-2 border-green-700 border-">
          {

            books.map((book, index) => (
              <tr key={book._id}>
                <td className="p-4 border-2 border-green-700 border-">{index + 1}</td>
                <td className="p-4 border-2 border-green-700 border-">{book.title}</td>
                <td className="p-4 border-2 border-green-700 border-">{book.author}</td>
                <td className="p-4 border-2 border-green-700 border-">{book.publishYear}</td>
                <td className="p-4 border-2 border-green-700 border-">{book.createdAt}</td>
                <td className="p-4 border-2 border-green-700 border-">{book.updatedAt}</td>
                <td className='flex flex-row gap-2  w-full justify-evenly p-4 border-2 border-green-700 border-'>
                  <Link to={`/books/edit/${book._id}`}><AiOutlineEdit  className='text-2xl text-yellow-600'/></Link>
                  <Link to={`/books/details/${book._id}`}><BsInfoCircle className='text-2xl text-green-500'/></Link>
                  <Link to ={`/books/delete/${book._id}`}><MdOutlineDelete className='text-2xl text-orange-600'/></Link>
                </td>
                


              </tr>

            ))

          }



        </tbody>
      </table>

      <div className='flex justify-center'>
        <Link to={'/books/create'} className='flex justify-center flex-col items-center border-2 border-green-700 mt-3 rounded-lg p-3 bg-green-400'>
        <CgAdd className='text-4xl text-green-900 text-center '/>
          <p className='text-xl font-bold'> Add New Book</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;

