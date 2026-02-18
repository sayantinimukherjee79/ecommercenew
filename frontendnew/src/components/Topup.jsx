import React, { useEffect, useState } from 'react'
import { BiUpArrowAlt } from "react-icons/bi";

function Topup() {

    const [show,setShow] = useState(false);

    useEffect(()=>{
       const handelScroll = () => {
        if(window.scrollY > 300){
             setShow(true)
        }   
        else{
             setShow(false)
        }
           
       }

       window.addEventListener('scroll',handelScroll);

       return ()=>{
        window.removeEventListener('scroll',handelScroll);
       }
    },[])

    if (!show) return null


    const scrolltoTop = () => {
        // browser giving us window.scrollTo function

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="fixed right-6 bottom-6 z-30">

            {/* onClick → function → browser API */}
            {/* when user click the button react will call a function and that function will call browser api which will controll browser scroll up */}

            <div onClick={scrolltoTop}
                className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow-md hover:shadow-xl 
                          cursor-pointer transition-all duration-300 hover:scale-105">
                <BiUpArrowAlt className="text-gray-800 text-2xl" />
            </div>
        </div>
    )
}

export default Topup