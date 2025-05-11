import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isWithinInterval, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Room, Booking } from '../../lib/supabase';

interface BookingCalendarProps {
  rooms: Room[];
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  rooms,
  bookings,
  onBookingClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(addDays(startDate, i));
  }

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getBookingsForRoomAndDay = (roomId: string, day: Date) => {
    return bookings.filter(booking => {
      const checkIn = new Date(booking.check_in);
      const checkOut = new Date(booking.check_out);
      
      return booking.room_id === roomId && 
             isWithinInterval(day, { start: checkIn, end: checkOut }) ||
             isSameDay(day, checkIn) ||
             isSameDay(day, checkOut);
    });
  };

  const getBookingLabel = (booking: Booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const totalNights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return `${totalNights} night${totalNights > 1 ? 's' : ''}`;
  };

  const isFirstDayOfBooking = (booking: Booking, day: Date) => {
    return isSameDay(new Date(booking.check_in), day);
  };

  const isLastDayOfBooking = (booking: Booking, day: Date) => {
    return isSameDay(new Date(booking.check_out), day);
  };

  return (
    <Card title="Booking Calendar" className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={goToPreviousWeek} icon={<ChevronLeft size={16} />} />
          <Button size="sm" variant="outline" onClick={goToToday}>Today</Button>
          <Button size="sm" variant="outline" onClick={goToNextWeek} icon={<ChevronRight size={16} />} />
        </div>
      </div>

      <div className="min-w-[800px]">
        <div className="grid grid-cols-[150px_repeat(7,1fr)] border-b border-gray-200">
          <div className="py-2 border-r border-gray-200 font-medium">Room</div>
          {daysOfWeek.map((day, index) => (
            <div 
              key={index} 
              className={`py-2 text-center font-medium ${
                isSameDay(day, new Date()) ? 'bg-primary-50 text-primary-700' : ''
              }`}
            >
              <div>{format(day, 'EEE')}</div>
              <div>{format(day, 'd')}</div>
            </div>
          ))}
        </div>

        {rooms.map(room => (
          <div key={room.id} className="grid grid-cols-[150px_repeat(7,1fr)] border-b border-gray-200">
            <div className="py-3 px-2 border-r border-gray-200">
              <div className="font-medium">{room.room_number}</div>
              <div className="text-xs text-gray-500">{room.type}</div>
            </div>

            {daysOfWeek.map((day, dayIndex) => {
              const dayBookings = getBookingsForRoomAndDay(room.id, day);
              
              return (
                <div key={dayIndex} className="relative h-16 border-r border-gray-100">
                  {dayBookings.map((booking, bookingIndex) => (
                    <div
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={`
                        absolute top-0 h-full cursor-pointer flex items-center justify-center text-xs font-medium text-white
                        ${isFirstDayOfBooking(booking, day) ? 'rounded-l-md' : ''}
                        ${isLastDayOfBooking(booking, day) ? 'rounded-r-md' : ''}
                        ${booking.status === 'confirmed' ? 'bg-primary-500' : ''}
                        ${booking.status === 'checked_in' ? 'bg-success-500' : ''}
                        ${booking.status === 'checked_out' ? 'bg-gray-500' : ''}
                        ${booking.status === 'cancelled' ? 'bg-danger-500' : ''}
                      `}
                      style={{
                        zIndex: 10 + bookingIndex,
                        left: isFirstDayOfBooking(booking, day) ? '0' : '-1px',
                        right: isLastDayOfBooking(booking, day) ? '0' : '-1px',
                        top: `${bookingIndex * 20}%`,
                        height: '80%',
                      }}
                    >
                      {isFirstDayOfBooking(booking, day) && getBookingLabel(booking)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BookingCalendar;