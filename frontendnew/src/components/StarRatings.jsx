import React, { useState } from 'react'
import { IoIosStarOutline } from "react-icons/io";

function StarRatings({rating,setRating}) {
    const [hover,setHover] = useState(0);
  return (
    <div className='flex items-center gap-2'>
        {
            [1,2,3,4,5].map((star)=>(
                <IoIosStarOutline 
                key={star}
                size={34}
                className={`cursor-pointer transition-colors ${
                    (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                }`}
            onClick={()=>setRating(star)}
            onMouseEnter={()=>setHover(star)}
            onMouseLeave={()=>setHover(0)}

                
            />
            ))
        }
         
    </div>
  )
}

export default StarRatings