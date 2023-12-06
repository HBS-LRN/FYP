import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreatableSelect from 'react-select/creatable';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import Swal from 'sweetalert2';
export default function StaffReservation() {
    const { reservation } = useLocation().state || {};
    const { user, token, setToken, setCartQuantity } = useStateContext()
    const [rightPopUpVisible, setRightPopUpVisible] = useState(false);
    const [hoveredTable, setHoveredTable] = useState(null);
    const [reservationData, setReservationData] = useState({});
    const [reservedTableData,setReservedTableData] = useState('')
    const selectedIcon = document.querySelectorAll('.selectedBorder');
    const RightPopUp = document.getElementById('popUpBoxRight');
    const [tables, setTables] = useState([]);
    const [selectedtable, setSelectedTable] = useState('');
    const [reservations, setReservations] = useState([]);
    const [custEmailOption,setCustEmailOption] = useState([]);
    const [custNameOption,setCustNameOption] = useState([]);
    const [custContactOption,setCustContactOption] = useState([]);
    const [newCustomerName, setCustomerName] = useState('');
    const [newCustomerEmail, setCustomerEmail] = useState('');
    const [newCustomerContact, setCustomerContact] = useState('');
    const [remark, setRemark] = useState('');
    const [pax, setPax] = useState('');
    const [date, setDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [validEmail,setValidEmail] =useState(true);
    const [validName,setValidName] =useState(true);
    const [validContact,setValidContact] =useState(true);
    const [validPax,setValidPax] =useState(true);
    const [tableChange,setTableChange]= useState(false)
    const [reselectedTableNum,setReselectedTableNum] = useState(0);
    // Handler functions to update the state 
    const currentDate = new Date();
    const selectedDate = new Date(date);
useEffect(() => {
    getTables();
    
    getUser();
    
        
      
}, []);

const getTables = async () => {
    try {
        const { data } = await axiosClient.get(`/tables`);
        // console.log("table data",data)
        setTables(data);
    } catch (error) {
        const response = error.response;
        console.log(response);
    }
}
// console.log("selectdate:",date);
// console.log("selectTime:",reservationTime)
// console.log("reservation:",reservations);
const getUser = () => {
    axiosClient.get('/getAlluser')
        .then(({ data }) => {
            // console.log('user data:', data); 
            const contact = data.customers.map(item => ({
                value: item.phone,
                label: item.phone,
            }));
            setCustContactOption(contact);
            const name = data.customers.map(item => ({
                value: item.name,
                label: item.name,
            }));
            setCustNameOption(name);
            const email = data.customers.map(item => ({
                value: item.email,
                label: item.email,
            }));
            setCustEmailOption(email);
            

        })
        .catch((error) => {
         
            console.error('API request error:', error);
        });
}
// console.log('name',custNameOption);

const filterCustomers = (data) => {
    console.log("data:", data);
    const serializedData = JSON.stringify(data);
    axiosClient.get(`/filterUser/${serializedData}`)
        .then(({ data }) => {
            console.log('filter data:', data.filteredUsers);
            setFilteredCustomers(data.filteredUsers);
        })
        .catch((error) => {
            console.error('API request error:', error);
        });
};
const setNewCustomerName = (newValue, callback) => {
    setCustomerName(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newValue, phone: newCustomerContact, email: newCustomerEmail });
};

const setNewCustomerEmail = (newValue, callback) => {
    setCustomerEmail(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newCustomerName, phone: newCustomerContact, email: newValue });
};

const setNewCustomerContact = (newValue, callback) => {
    setCustomerContact(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newCustomerName, phone: newValue, email: newCustomerEmail });
};
// console.log("Outselectdate:",date);
// console.log("OutselectTime:",reservationTime)
const getReservations = async (idate,ireservationTime) => {
//     console.log("selectdate:",date);
// console.log("selectTime:",reservationTime)
    if(ireservationTime && idate){
        const data = {
            reservation_date: idate,
            reservation_time: ireservationTime
        };
        axiosClient.post('/reservation',data)
            .then(({ data }) => {
                console.log('reservation data:', data);
                setReservations(data);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    }else if(!ireservationTime && !idate){
        const data = {
            reservation_date: date,
            reservation_time: reservationTime
        };
        axiosClient.post('/reservation',data)
            .then(({ data }) => {
                console.log('reservation data:', data);
                setReservations(data);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    }
   

}
const handleTableNum = (num) => {
    const selectedTable = tables.find((table) => table.id === parseInt(num, 10)); // Parse the value to an integer
    
    // console.log('reselected', selectedTable);
    // setSelectedTable(selectedTable);
    setReselectedTableNum(parseInt(num, 10));
};
const deleteReservation = async () =>{
    const tableDelete= reservations.filter((data)=> data.table_id ===selectedtable.id);
    console.log("resertable id:",tableDelete[0].id)
    Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to delete this reservation?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
        axiosClient.delete(`/deleteReservations/${tableDelete[0].id}`)
        .then((response) => {
            const activeData = {
                user_id:user.id,
                Action: "Deleted customer's reservation", 
                ActionIcon:"fa-solid fa-trash"
            }
            axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Reservation deleted successfully",
                        icon: "success"
                      });
                      getReservations(date,reservationTime);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });
            
        })
        .catch((error) => {
            console.error('Error deleting reservation:', error);
        });
         
        }
      });

}
const makeChangeTable = async () =>{
    const tableData = tables.filter((data)=> data.id ===reselectedTableNum);
            if(pax>tableData[0].seat_capacity){
                Swal.fire({
                    icon: "error",
                    title: "Maximun "+tableData[0].seat_capacity+" seat capacity are available of table "+ reselectedTableNum,
                    text: "Please reduce the quanlity of pax of select another table.",
                  });
                  setPax(tableData[0].seat_capacity);
            }else{
                const updateReservation = reservations.filter((data) => data.table_id ===selectedtable.id);

    if(updateReservation.length>0){
        const data ={
            user_id: updateReservation[0].user_id,
            table_id: reselectedTableNum,
            reservation_date: date,
            reservation_time: reservationTime,
            pax: pax,
            remark: remark
        }
        console.log("update data:",data);
        axiosClient.post(`/updateReservations/${updateReservation[0].id}`,data)
            .then(({ data }) => {
                const activeData = {
                    user_id:user.id,
                    Action: "Update customer's reservation", 
                    ActionIcon:"fa-solid fa-pen"
                }
                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "You have successfully upate your table",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      getReservations(date,reservationTime);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });

                
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    text: "please select other table for change.",
                  });
                console.error('API request error:', error);
            });
    }
            }
    
}
// console.log("outSelectedT:",reselectedTableNum);
const isReselectedTable = (tableNum) => {
    // console.log("insideSelectedT:",reselectedTableNum);
    return tableNum === reselectedTableNum;
};
const makeReservation = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{3}-\d{7}$/;
    if(!pax && !newCustomerName && !newCustomerEmail && !newCustomerContact){
        Swal.fire({
            icon: "error",
            title: "The important information are required",
            text: "Please fill in the information in each red color input bar.",
        });
        setValidEmail(false);
        setValidName(false);
        setValidContact(false);
        setValidPax(false);
        return;
    }
    if(!pax){
        Swal.fire({
            icon: "error",
            title: "Pax value are required",
            text: "Please set the pax number.",
        });
        setValidPax(false);
        return; 
    }else{
        if(pax>selectedtable.seat_capacity){
            Swal.fire({
                icon: "error",
                title: "Maximun "+selectedtable.seat_capacity+" seat capacity are available of table "+ selectedtable.id,
                text: "Please reduce the quanlity of pax of select another table.",
              });
              setValidPax(false);
              setPax(selectedtable.seat_capacity);
        }
        setValidPax(true);
    }
    if(!newCustomerName){
        Swal.fire({
            icon: "error",
            title: "Customer's name are required",
            text: "Please select or set the customer's name.",
        });
        setValidName(false);
        return; 
    }else{
        setValidName(true);
    }
    if (!emailRegex.test(newCustomerEmail) && !contactRegex.test(newCustomerContact)){
        Swal.fire({
            icon: "error",
            title: "Invalid Email and Contact",
            text: "Please enter a valid email address and contact format such as 012-3456789.",
        });
        setValidEmail(false);
        setValidContact(false);
        return; 
    }
    if(!newCustomerEmail){
        Swal.fire({
            icon: "error",
            title: "Customer's email are required",
            text: "Please select or set the customer's email.",
        });
        setValidEmail(false);
        return; 
    }else{
    
    if (!emailRegex.test(newCustomerEmail)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
        });
        setValidEmail(false);
        return;
    }
    setValidEmail(true);
    }
    if(!newCustomerContact){
        Swal.fire({
            icon: "error",
            title: "Customer's contact are required",
            text: "Please select or set the customer's contact.",
        });
        setValidContact(false);
        return;
    }else{
        
    if (!contactRegex.test(newCustomerContact)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Contact",
            text: "Please enter a valid phone number in the format 012-3456789.",
        });
        setValidContact(false);
        return;
    }
    setValidContact(true);
    }
    
    // console.log('filteredCustomers:',filteredCustomers);
    var newReservationData;
    if(filteredCustomers.length==1){
        
        newReservationData = {
            user_id: filteredCustomers[0].id,
            table_id: selectedtable.id,
            remark: remark,
            pax: pax,
            reservation_date: date,
            reservation_time: reservationTime,
            reservation_status: 'Y',
            cust_name: null,
            cust_email: null,
            cust_contact: null,
        };
    }else{
        newReservationData = {
            user_id: user.id,
            table_id: selectedtable.id,
            remark: remark,
            pax: pax,
            reservation_date: date,
            reservation_time: reservationTime,
            reservation_status: 'Y',
            cust_name: newCustomerName,
            cust_email: newCustomerEmail,
            cust_contact: newCustomerContact,
        };
    }
    // console.log("newReservationData",newReservationData);
    try {
        await axiosClient.post('/addReservations', newReservationData).then(({ data }) => {
            console.log("booked",data);
            // Update the reservations state with the new reservation data
            const activeData = {
                user_id:user.id,
                Action: "Help customer make a reservation", 
                ActionIcon:"fa-solid fa-upload"
            }
            axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your reservation has been reserved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    getReservations(date,reservationTime);
                    cleardata();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });
            
        });
    } catch (error) {
        // Handle any errors, e.g., show an error message to the user
        console.error('Error creating reservation:', error);
    }
};
const cleardata = () =>{
    setCustomerName(null);
    setCustomerEmail(null);
    setCustomerContact(null);
    setRemark(null);
}
const isTableReserved = (tableId) => {
    // console.log('tableId',tableId);
    // Find the table with the given ID
    const table = tables.find((t) => t.id === tableId);

    if (table) {
        // Filter reservations for the given table ID
        const reservedReservations = reservations.filter((reservation) => reservation.table_id === tableId);

        // Check if there are any reservations for the table
        return reservedReservations.length > 0;
    } else {
        // Table doesn't exist, so it can't be reserved
        return false;
    }
};

const handleTableClick = (i) => {
const tableid = tables[i].id;
if(date){
    if (selectedDate < currentDate) {
        Swal.fire({
            icon: "error",
            title: "Invalid Date",
            text: "Please select a future date for reservation.",
        });
        return; // Exit the function if the date is invalid
    }
}
if(reservationTime && date ){

    if(RightPopUp.style.display=="none"){
        RightPopUp.style.display="block";
        RightPopUp.style.cssText="animation: right-popUpOpen .6s ease;";
        selectedIcon[i].style.display="block";
        const reservedReservations = reservations.filter((reservation) => reservation.table_id === tableid);
        if(reservedReservations.length>0){
            
            setTableChange(true);
            if(reservedReservations[0].cust_email!=null){
                setCustomerName(reservedReservations[0].cust_name);
                setCustomerEmail(reservedReservations[0].cust_email);
                setCustomerContact(reservedReservations[0].cust_contact);
                setRemark(reservedReservations[0].remark);
                setPax(reservedReservations[0].pax);
                setDate(reservedReservations[0].reservation_date);
                setReservationTime(reservedReservations[0].reservation_time);
            }else{
                axiosClient.get(`/getUser/${reservedReservations[0].user_id}`)
                .then(({ data }) => {
                    console.log('filter data:', data.user);
                    setCustomerName(data.user.name);
                    setCustomerEmail(data.user.email);
                    setCustomerContact(data.user.phone);
                    setRemark(reservedReservations[0].remark);
                    setPax(reservedReservations[0].pax);
                    setDate(reservedReservations[0].reservation_date);
                    setReservationTime(reservedReservations[0].reservation_time);
                })
                .catch((error) => {
                    console.error('API request error:', error);
                });
            }
        }else{
            cleardata();
        }
        const selectedTable = tables.find((table) => table.id === tableid);
        setReselectedTableNum(selectedTable.id);
        setSelectedTable(selectedTable);
    }else{
        selectedIcon[i].style.display="none";
        RightPopUp.style.display="none";  
        setTableChange(false);
        setSelectedTable('');
        setValidEmail(true);
        setValidName(true);
        setValidContact(true);
        setValidPax(true);
    }
}else{
    Swal.fire({
        icon: "error",
        title: "Undefine reservation date and time...",
        text: "Please set the reservation date time first, before make a reservation.",
      
      });
}
};
 const handlePaxChange = (pax1) => {
    if(date){
        if (selectedDate < currentDate) {
            Swal.fire({
                icon: "error",
                title: "Invalid Date",
                text: "Please select a future date for reservation.",
            });
            return; // Exit the function if the date is invalid
        }
    }
    if(!reservationTime && !date ){
        Swal.fire({
            icon: "error",
            title: "Undefine reservation date and time...",
            text: "Please set the reservation date time first, before make a reservation.",
            
          });
          setPax('');
    }else{
        if(tableChange && reselectedTableNum!=0){
            const tableData = tables.filter((data)=> data.id ===reselectedTableNum);
            if(pax1>tableData[0].seat_capacity){
                Swal.fire({
                    icon: "error",
                    title: "Maximun "+tableData[0].seat_capacity+" seat capacity are available of table "+ reselectedTableNum,
                    text: "Please reduce the quanlity of pax of select another table.",
                  });
                  setPax(tableData[0].seat_capacity);
            }
            
        }else{
            if(pax1>selectedtable.seat_capacity){
                Swal.fire({
                    icon: "error",
                    title: "Maximun "+selectedtable.seat_capacity+" seat capacity are available of table "+ selectedtable.id,
                    text: "Please reduce the quanlity of pax of select another table.",
                  });
                  setPax(selectedtable.seat_capacity);
            }
        }
    
    }
     
}
const handleDateChange =(date)=>{
    getReservations(date,reservationTime);
}
const handleTimeChange =(reservationTime)=>{
    getReservations(date,reservationTime);
} 
const handleTableMouseOver = (i) => {
if (RightPopUp.style.display=="none") {
   selectedIcon[i].style.display = 'block';
// setHoveredTable(i);
}
};

const handleTableMouseOut = (i) => {
if (RightPopUp.style.display=="none") {
    selectedIcon[i].style.display = 'none';
}
//    setHoveredTable(i); 

};
    return(
        <div>
            <Helmet>
  <link rel="stylesheet" href="../../../assets/css/staffReservationStyle.css" />


  </Helmet>
  <form action="" method="post">
  <div class="popUpBoxLeft" id="popUpBoxLeft">
        <div class="popUp-overlay"></div>
        <div class="main-popUp">
            <div class="popUp-content">
                
                <div class="userInforBox">
                    <div class="inforBox">
                    {user && user.image ? (

                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
                        width="80" height="80"
                    />

                    ) : (
                    <i class="fas fa-user"></i>
                    )}
                        
                        <div class="name">{user.name}</div>
                    </div>
                </div>
                <fieldset class="numOfReserveSeatBox">
                    <legend>Reservation Number</legend>
                    <span class="title"><b>Pax : </b><input type="number" class={validPax?"num":"num error"} name="pax" id="pax" placeholder='Enter the pax here...' value={pax}
                        onChange={(e) => {setPax(e.target.value);
                        handlePaxChange(e.target.value);}}/></span>
                </fieldset>
                <div class="dateTimeBox">
                    <fieldset class="dateBox">
                        <legend>Reservation Date</legend>
                        <input type="date" name="date" id="date"  value={date}
                        onChange={(e) =>{setDate(e.target.value);
                        handleDateChange(e.target.value)}}/>
                    </fieldset>
                    <fieldset class="timeBox">
                        <legend>Reservation Time</legend>
                        <div className="timeSelectBox">
                        <select name="reservation_time" class="form-control time-dropdown" required
                           value={reservationTime}
                           onChange={(e) => {setReservationTime(e.target.value);handleTimeChange(e.target.value);}}>
                            <option value="">Select A Time</option>
                            <option value="11AM - 1PM Section">11AM - 1PM Section</option>
                            <option value="1PM - 3PM Section">1PM - 3PM Section</option>
                            <option value="6PM - 8PM Section">6PM - 8PM Section</option>
                            <option value="8PM - 10PM Section">8PM - 10PM Section</option>
                        </select>
                        <i class="fa-solid fa-clock"></i>
                        </div>
                        
                        
                    </fieldset>
                </div>
               

                
            </div>
        </div>
    </div>
    <div className="scollBoxReservation" id="scollBox" >
    <div class="fpmbg" id="fpmbg">
        
            <div className="table8Box tableBox">

            <div
                    className={`table8a table8 table ${
                        hoveredTable === 0 ? "hovered" : ""
                    } ${isTableReserved(1) ? "reservedTable8" : ""}`}
                    onClick={() => handleTableClick(0)}
                    onMouseOver={() => handleTableMouseOver(0)}
                    onMouseOut={() => handleTableMouseOut(0)}
                >
                    {isReselectedTable(1) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(1) && tableChange?"selectedBorder bottom130":"selectedBorder bottom1"}></div>
                  </div>     
                
                  <div
                    className={`table8b table8 table ${
                        hoveredTable === 1 ? "hovered" : ""
                    } ${isTableReserved(2) ? "reservedTable8" : ""}`}
                    onClick={() => handleTableClick(1)}
                    onMouseOver={() => handleTableMouseOver(1)}
                    onMouseOut={() => handleTableMouseOut(1)}
                >
                    {isReselectedTable(2) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(2) && tableChange?"selectedBorder bottom130":"selectedBorder bottom1"}></div>

                </div>
                
            </div>
            
            <div className="table4Box tableBox" >
                <div className="table4Flex">

                <div
                    className={`table4a table4 table4Left table ${
                        hoveredTable === 2 ? "hovered" : ""
                    } ${isTableReserved(3) ? "reservedTable4" : ""}`}
                    onClick={() => handleTableClick(2)}
                    onMouseOver={() => handleTableMouseOver(2)}
                    onMouseOut={() => handleTableMouseOut(2)}
                >

                    {isReselectedTable(3) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(3) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                        </div>
                        <div
                            className={`table4b table4 table4Right table ${
                                hoveredTable === 3 ? "hovered" : ""
                            } ${isTableReserved(4) ? "reservedTable4" : ""}`}
                            onClick={() => handleTableClick(3)}
                            onMouseOver={() => handleTableMouseOver(3)}
                            onMouseOut={() => handleTableMouseOut(3)}
                        >
                
                {isReselectedTable(4) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(4) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                    </div>
                        
                    
                </div>
                <div className="table4Flex">
                <div
                            className={`table4c table4 table4Left table ${
                                hoveredTable === 4 ? "hovered" : ""
                            } ${isTableReserved(5) ? "reservedTable4" : ""}`}
                            onClick={() => handleTableClick(4)}
                            onMouseOver={() => handleTableMouseOver(4)}
                            onMouseOut={() => handleTableMouseOut(4)}
                        >
               
               {isReselectedTable(5) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(5) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                    </div>
                    <div
                            className={`table4d table4 table4Right table ${
                                hoveredTable === 5 ? "hovered" : ""
                            } ${isTableReserved(6) ? "reservedTable4" : ""}`}
                            onClick={() => handleTableClick(5)}
                            onMouseOver={() => handleTableMouseOver(5)}
                            onMouseOut={() => handleTableMouseOut(5)}
                        >
                        {isReselectedTable(6) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(6) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                    </div>

                </div>
                <div className="table4Flex">
                <div
                            className={`table4e table4 table4Left table  ${
                                hoveredTable === 6 ? "hovered" : ""
                            } ${isTableReserved(7) ? "reservedTable4" : ""}`}
                            onClick={() => handleTableClick(6)}
                            onMouseOver={() => handleTableMouseOver(6)}
                            onMouseOut={() => handleTableMouseOut(6)}
                        >
                        {isReselectedTable(7) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(7) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                    </div>
    
                    <div
                            className={`table4f table4 table4Right table ${
                                hoveredTable === 7 ? "hovered" : ""
                            } ${isTableReserved(8) ? "reservedTable4" : ""}`}
                            onClick={() => handleTableClick(7)}
                            onMouseOver={() => handleTableMouseOver(7)}
                            onMouseOut={() => handleTableMouseOut(7)}
                        >
                        {isReselectedTable(8) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(8) && tableChange?"selectedBorder bottom80":"selectedBorder bottom0"}></div>

                    </div>

                </div>
               
            </div>
            
            <div className="table12Box tableBox">
            <div
                            className={`table12a table12 table12Left table ${
                                hoveredTable === 8 ? "hovered" : ""
                            } ${isTableReserved(9) ? "reservedTable12" : ""}`}
                            onClick={() => handleTableClick(8)}
                            onMouseOver={() => handleTableMouseOver(8)}
                            onMouseOut={() => handleTableMouseOut(8)}
                        >
                    {isReselectedTable(9) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(9) && tableChange?"selectedBorder topMinus80":"selectedBorder top0"}></div>

                </div>
    
                <div
                            className={`table12b table12 table12Right table ${
                                hoveredTable === 9 ? "hovered" : ""
                            } ${isTableReserved(10) ? "reservedTable12" : ""}`}
                            onClick={() => handleTableClick(9)}
                            onMouseOver={() => handleTableMouseOver(9)}
                            onMouseOut={() => handleTableMouseOut(9)}
                        >
                    {isReselectedTable(10) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(10) && tableChange?"selectedBorder topMinus80":"selectedBorder top0"}></div>

                </div>
            </div>
            <div className="table2Box tableBox">
                <div className="table2Flex">
                <div
                            className={`table2a table2 table2Left table ${
                                hoveredTable === 10 ? "hovered" : ""
                            } ${isTableReserved(11) ? "reservedTable2" : ""}`}
                            onClick={() => handleTableClick(10)}
                            onMouseOver={() => handleTableMouseOver(10)}
                            onMouseOut={() => handleTableMouseOut(10)}
                        >
                        {isReselectedTable(11) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(11) && tableChange?"selectedBorder topMinus30":"selectedBorder top20"}></div>

                    </div>
    
                    <div
                            className={`table2b table2 table2Right table ${
                                hoveredTable === 11 ? "hovered" : ""
                            } ${isTableReserved(12) ? "reservedTable2" : ""}`}
                            onClick={() => handleTableClick(11)}
                            onMouseOver={() => handleTableMouseOver(11)}
                            onMouseOut={() => handleTableMouseOut(11)}
                        >
                        {isReselectedTable(12) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(12) && tableChange?"selectedBorder topMinus30":"selectedBorder top20"}></div>

                    </div>
                </div>
                <div className="table2Flex">
                <div
                            className={`table2c table2 table2Left table ${
                                hoveredTable === 12 ? "hovered" : ""
                            } ${isTableReserved(13) ? "reservedTable2" : ""}`}
                            onClick={() => handleTableClick(12)}
                            onMouseOver={() => handleTableMouseOver(12)}
                            onMouseOut={() => handleTableMouseOut(12)}
                        >
                        {isReselectedTable(13) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(13) && tableChange?"selectedBorder topMinus30":"selectedBorder top20"}></div>

                    </div>
    
                    <div
                            className={`table2d table2 table2Right table ${
                                hoveredTable === 13 ? "hovered" : ""
                            } ${isTableReserved(14) ? "reservedTable2" : ""}`}
                            onClick={() => handleTableClick(13)}
                            onMouseOver={() => handleTableMouseOver(13)}
                            onMouseOut={() => handleTableMouseOut(13)}
                        >
                        {isReselectedTable(14) && tableChange?<div className="reselectBorder"></div>:""}
                    <div className={isReselectedTable(14) && tableChange?"selectedBorder topMinus30":"selectedBorder top20"}></div>

                    </div>
                </div>
            </div>
        
    </div>
    </div>
    <div class="popUpBoxRight" id="popUpBoxRight" style={{ display: "none" }}>
  
        <div class="popUp-overlay"></div>
        <div class="main-popUp">
            <div class="popUp-content">
            
            <div className="tableInforBox">
    <div className="inforBox">
        <i className="fas fa-map-marker-alt"></i>
        <p className="tableNum">
            Table {tableChange ?
                <span>
                    <input 
                        type='number' 
                        min={1} 
                        max={14} 
                        value={reselectedTableNum} 
                        onChange={(e) => handleTableNum(e.target.value)}
                    />
                    <i className="fa-solid fa-trash" onClick={deleteReservation}></i>
                </span>
                : selectedtable ? selectedtable.id : '?'
            }
        </p>
    </div>
</div>

                
                <fieldset class="paxBox">
                        <legend>Available Table Seat</legend>
                        <span class="title"><b>Pax : </b></span>
                        <span className="number">
                            {tableChange && reselectedTableNum !== 0
                                ? (() => {
                                    const tableData = tables.filter((data) => data.id === reselectedTableNum);
                                    return tableData.length > 0 ? tableData[0].seat_capacity : '?';
                                })()
                                : selectedtable
                                ? selectedtable.seat_capacity
                                : '?'}
                            </span>

                        
                    </fieldset>
                    <fieldset className="genderBox">
                    <legend>Customer's Name</legend>
                    <CreatableSelect
                        className={validName?'':'error'}
                        options={[...custNameOption, { value: newCustomerName, label: newCustomerName }]}
                        isSearchable
                        onChange={(selectedOption) => setNewCustomerName(selectedOption.value)}
                        value={newCustomerName?{ value: newCustomerName, label: newCustomerName }:''}
                   />
                </fieldset>

                <fieldset className="custNameBox">
                    <legend>Customer Email</legend>
                    <CreatableSelect
                        className={validEmail?'':'error'}
                        options={[...custEmailOption, { value: newCustomerEmail, label: newCustomerEmail }]}
                        isSearchable
                        onChange={(selectedOption) => setNewCustomerEmail(selectedOption.value)}
                        value={newCustomerEmail?{ value: newCustomerEmail, label: newCustomerEmail }:''}
                   />
                </fieldset>

                <fieldset className="custContactBox">
                    <legend>Customer Contact</legend>
                    <CreatableSelect
                        className={validContact?'':'error'}
                        options={[...custContactOption,{ 
                            value: newCustomerContact,
                            label: newCustomerContact 
                            }]}
                        isSearchable
                        onChange={(selectedOption) => setNewCustomerContact(selectedOption.value)}
                       value={
                        newCustomerContact?{ 
                            value: newCustomerContact,
                            label: newCustomerContact 
                            }:''
                       }
                    />
                </fieldset>
                <fieldset class="remarkBox">
                    <legend>Remark</legend>
                    <textarea name="remark" placeholder="Remark..." id="remark" cols="30" rows="10" value={remark?remark:''} onChange={(e) => setRemark(e.target.value)}></textarea>
                </fieldset>
                
                    <div class="bookBtnBox">
                        {tableChange? <a class="changeBtn" onClick={makeChangeTable}>Change Now</a>: <a class="reserveBtn" onClick={makeReservation}>Book Now</a>}
                        
                    </div>
            </div>
        </div>
    </div>
    </form>
        </div>
    );
}