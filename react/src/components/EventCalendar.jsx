


import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Swal from 'sweetalert2';
export default class EventCalendar extends Component {

    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
               

                events={[
                    { id: 1, title: 'Booked Table No 5, 11 Pax, On 11am - 1pm Session', date: '2023-07-11' },
                    { id: 2, title: 'Booked Table No 2, 2 Pax, On 1pm - 3pm Session', date: '2023-07-16' },
                  
                ]}
                dateClick={this.handleDateClick}
                eventClick = {this.handleEventClick}
            />
        )
    }
    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }

    handleEventClick = (arg) => { // bind with an arrow function
        console.log(arg)
      
        Swal.fire({
            title: 'Are you sure?!',
            text: 'Record will be deleted',
            type: 'warning',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete Record',
          }).then((result) => {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'Reservation Has Successfully Cancelled',
                customClass: 'swal-wide',
            })
          });

         
    }
}

