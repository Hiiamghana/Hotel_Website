import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import { getRoomById } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi } from 'react-icons/fa';
import { FaWineGlass } from 'react-icons/fa6';
import RoomCarousel from '../common/RoomCarousel';



const CheckOut = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({ photo: '', roomType: '', roomPrice: '' });
  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  }, [roomId]);

  return (
    <div className='checkout-container'>
      <section className='container'>
        <div className='row flex-column flex-md-row align-items-center justify-between'>
          <div className='col-md-4 mt-5 mb-5'>
            {isLoading ? (
              <p className='loading-text'>Loading room information...</p>
            ) : error ? (
              <p className='error-text'>{error}</p>
            ) : (
              <div className='room-info card p-3 shadow-lg'>
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt='Room Photo'
                  className='room-image'
                />
                <table className='table table-striped'>
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Room Price:</th>
                      <td>{roomInfo.roomPrice} / night</td>
                    </tr>
                    <tr>
                      <td colSpan='2'>
                        <ul className='amenities-list'>
                          <li><FaWifi /> Free Wifi</li>
                          <li><FaTv /> Netflix & Prime Video</li>
                          <li><FaUtensils /> Complimentary Breakfast</li>
                          <li><FaWineGlass /> Mini Bar</li>
                          <li><FaCar /> Car Service</li>
                          <li><FaParking /> Parking Available</li>
                          <li><FaTshirt /> Laundry Service</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='col-md-8'>
            <BookingForm />
          </div>
        </div>
      </section>
      <div className='container'>
        <RoomCarousel/>



      </div>
    </div>
  );
};

export default CheckOut;