import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function FloorPlanMaping() {
  const date = new Date();
        // const time = document.getElementById('time');
        // var hours;
        // var ampm; 
        // var minutes;

        // if((date.getHours()+1)>12){
        //     hours=date.getHours()-12;
        //     ampm="pm";
        // }else{
        //     hours=date.getHours();
        //     ampm="am";
        // }
        // if(date.getMinutes()<10){
        //     minutes="0"+date.getMinutes();
        // }else{
        //     minutes=date.getMinutes();  
        // }
        // time.innerHTML = hours + " : " + minutes + ampm;
      
        // const tables = document.querySelectorAll('.table');
        
        // const RightPopUp = document.getElementById('popUpBoxRight');
        // const selectedIcon = document.querySelectorAll('.selectedBorder');
        // RightPopUp.style.display="none";
        // for (let i = 0; i < tables.length; i++) {
        //     tables[i].addEventListener("click",function(){
        //         if(RightPopUp.style.display=="none"){
        //             RightPopUp.style.display="block";
        //             RightPopUp.style.cssText="animation: right-popUpOpen .6s ease;";
        //             selectedIcon[i].style.display="block";
                    

        //         }else{
        //             selectedIcon[i].style.display="none";
        //             RightPopUp.style.display="none";

                    

                    
        //         }
        //     });
        //     tables[i].addEventListener("mouseover",function(){
        //         if(selectedIcon[i].style.display=="none"){
                   
        //             selectedIcon[i].style.display="block";

        //         }
        //     });
        //     tables[i].addEventListener("mouseout",function(){
        //         if(selectedIcon[i].style.display=="block"){
                   
        //             selectedIcon[i].style.display="none";

        //         }
        //     });
        // }
        const [currentTime, setCurrentTime] = useState(new Date());
  const [rightPopUpVisible, setRightPopUpVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTableClick = () => {
    setRightPopUpVisible((prevVisible) => !prevVisible);
  };

  const handleTableMouseOver = (i) => {
    if (!rightPopUpVisible) {
      selectedIcon[i].style.display = 'block';
    }
  };

  const handleTableMouseOut = (i) => {
    if (rightPopUpVisible) {
      selectedIcon[i].style.display = 'none';
    }
  };
  return (
<div>

  <Helmet>
  <link rel="stylesheet" href="../../../assets/css/floorPlanReservation.css" />


  </Helmet>
  <div className="popUpBoxLeft" id="popUpBoxLeft">
        <div className="popUp-overlay"></div>
        <div className="main-popUp">
            <div className="popUp-content">
                
                <div className="userInforBox">
                    <div className="inforBox">
                        <i className="fas fa-user"></i>
                        <div className="name">John Cena</div>
                    </div>
                </div>
                <fieldset className="contactNumbox">
                    <legend>Contact Number</legend>
                    <p className="contact"><i className="fas fa-phone"></i>012-2204435</p>
                </fieldset>
                <fieldset className="genderBox">
                    <legend>Gender</legend>
                    <p className="gender"><i className="fas fa-mars"></i>Male</p>
                </fieldset>
                <fieldset className="numOfReserveSeatBox">
                    <legend>Reservation Number</legend>
                    <span className="title"><b>Pax : </b></span><span className="num">12</span>
                </fieldset>
                <div className="dateTimeBox">
                    <fieldset className="dateBox">
                        <legend>Reservation Date</legend>
                        <input type="date" name="date" id="date" value="2023-07-26" readOnly/>
                    </fieldset>
                    <fieldset className="timeBox">
                        <legend>Reservation Time</legend>
                        <div className="sessionTime">
                            10 pm - 12 pm
                        </div>
                    </fieldset>
                </div>

                
            </div>
        </div>
    </div>
    <div className="scollBoxReservation" id="scollBox">
       
        <div>
            <div className="table8Box tableBox">
                 <div className="table8a table8 table">
                    <div className="selectedBorder"></div>
                  </div>     
                
                <div className="table8b table8 table">
                    <div className="selectedBorder"></div>
                </div>
                
            </div>
            
            <div className="table4Box tableBox">
                <div className="table4Flex">
                    <div className="table4a table4 table4Left table" >
                        <div className="selectedBorder"></div>
                        </div>
    
                    
                    <div className="table4b table4 table4Right table" >
                        <div className="selectedBorder"></div>
                    </div>
                        
                    
                </div>
                <div className="table4Flex">
                    <div className="table4c table4 table4Left table" >
                        <div className="selectedBorder"></div>
                    </div>
    
                    <div className="table4d table4 table4Right table" >
                        <div className="selectedBorder"></div>
                    </div>

                </div>
                <div className="table4Flex">
                    <div className="table4e table4 table4Left table" >
                        <div className="selectedBorder"></div>
                    </div>
    
            
                    <div className="table4f table4 table4Right table" >
                        <div className="selectedBorder"></div>
                    </div>
                        
                    
                </div>
               
            </div>
            
            <div className="table12Box tableBox">
                <div className="table12a table12 table12Left table" >
                    <div className="selectedBorder"></div>
                </div>
    
            
                <div className="table12a table12 table12Right table" >
                    <div className="selectedBorder"></div>
                </div>
            </div>
            <div className="table2Box tableBox">
                <div className="table2Flex">
                    <div className="table2a table2 table2Left table" >
                        <div className="selectedBorder"></div>
                    </div>
    
            
                    <div className="table2b table2 table2Right table" >
                        <div className="selectedBorder"></div>
                    </div>
                </div>
                <div className="table2Flex">
                    <div className="table2c table2 table2Left table" >
                        <div className="selectedBorder"></div>
                    </div>
    
            
                    <div className="table2d table2 table2Right table" >
                        <div className="selectedBorder"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="popUpBoxRight" id="popUpBoxRight" style={{ display: rightPopUpVisible ? 'block' : 'none' }}>
        <div className="popUp-overlay"></div>
        <div className="main-popUp">
            <div className="popUp-content">
             

                <div className="tableInforBox">
                    <div className="inforBox">
                        <i className="fas fa-map-marker-alt"></i>
                        <p className="tableNum">Table 1</p>
                    </div>
                    
                </div>
                
                <fieldset className="paxBox">
                        <legend>Available Table Seat</legend>
                        <span className="title"><b>Pax : </b></span>
                        <span className="number">12</span>
                    </fieldset>
                    <div className="dateTimeBox">
                        <fieldset className="currentDateBox">
                            <legend>Date Making Reservation</legend>
                            
                            <p className="date">Today</p>
                        </fieldset>
                        <fieldset className="currentTimeBox">
                            <legend>Time Making Reservation</legend>
                            
                            <p className="time" id="time"> {currentTime.getHours()} : {currentTime.getMinutes()} {currentTime.getHours() > 12 ? 'pm' : 'am'}</p>
                        </fieldset>
                </div>
                <fieldset className="remarkBox">
                    <legend>Remark</legend>
                    <textarea name="remark" placeholder="Enter if any important for mention..." id="remark" cols="30" rows="10"></textarea>
                </fieldset>
                    <div className="bookBtnBox">
                        <a href="" className="reserveBtn">Book Now</a>
                    </div>
            </div>
        </div>
    </div>
    
</div>
  );
}
