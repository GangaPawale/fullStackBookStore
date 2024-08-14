import { useState ,useEffect} from 'react'

import {Routes,Route} from 'react-router-dom'


import axios from 'axios'

import Spinner from './components/Spinner'
import {CreateBook,EditBook,ShowBook,DeleteBook,Home} from './pages/index'


function App() {
  // const [count, setCount] = useState(0)
  

  return (
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path={`/books/details/:id`} element={<ShowBook/>}/>
      <Route path="/books/edit/:id" element={<EditBook/>}/>
      <Route path="/books/delete/:id" element={<DeleteBook/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>

    </Routes>
  )
}

export default App


