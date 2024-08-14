import React from 'react'
import {Link} from 'react-router-dom'
import { BsArrowLeft, BsArrowLeftSquareFill } from 'react-icons/bs'

const BackButton = ({destination="/"}) => {
  return (
    <div className='p-2 border-2 border-purple-800 inline-block ' >
        <Link to={destination}>
        
<BsArrowLeft className='text-4xl text-purple-800 bottom-2 border-purple-800 ' />
        </Link>
    </div>
  )
}

export default BackButton