


import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Swal from 'sweetalert2';
export default class EventCalendar extends Component {

    render() {
        const { reservations } = this.props; // Get reservations from props


      
        const events = reservations.map((reservation) => ({
            id: reservation.pivot.id,
            title: `Booked Table No ${reservation.id}, ${reservation.pivot.pax} Pax, On ${reservation.pivot.reservation_time}`,
            date: reservation.pivot.reservation_date,
        }));

        return (

        
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                events={events} // Use the events generated from reservations
                dateClick={this.handleDateClick}
                eventClick={this.handleEventClick}
            />
        );
    }
    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }


    handleEventClick = (arg) => {
        const { reservations, onDeleteReservation } = this.props;
        const eventId = arg.event.id;



        console.log(reservations)
        // Find the reservation associated with the event
        const reservation = reservations.find((r) => r.pivot.id == eventId);


        console.log(reservation.pivot.id)
        if (reservation) {
            // Call the onDeleteReservation callback with the reservation ID
            onDeleteReservation(reservation.pivot.id);
        }
    }

}

