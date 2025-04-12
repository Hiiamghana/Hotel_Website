import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import BookingsTable from './BookingsTable'
import Header from '../common/Header'
import { getAllBookings } from '../utils/ApiFunctions'

export const Bookings = () => {
    const [bookingInfo, setBookingInfo]= useState([])
    const[isLoading,setIsLoading]= useState(true)
    const[error, setError]= useState("")

    useEffect(()=>{
        setTimeout(()=>{
            getAllBookings().then((data)=>{
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error)=>{
                setError(error.message)
                setIsLoading(false)
            })

        },1000)
    },[])


    const handleBookingCancellation= async(bookingid)=>{
        try{
            await cancelBooking(bookingid)
            const data= await getAllBookings()
            setBookingInfo(data)

        }catch(error){
            setError(error.message)

        }
    }

  return (
    <section className='container' style={{backgroundColor:"whitesmoke"}}>
      <Header title={"Existing Bookings"}/>
      {error && (<div className='text-danger'>{error}</div>)}
      {isLoading ? (<div>  Loading exixting bookings </div>
      
    ): (
        <BookingsTable bookingInfo={bookingInfo} 
        handleBookingCancellation={handleBookingCancellation}/>
    )}

      


    </section>
  )
}


