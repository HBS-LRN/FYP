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
        const [hoveredTable, setHoveredTable] = useState(null);
        const selectedIcon = document.querySelectorAll('.selectedBorder');
        const RightPopUp = document.getElementById('popUpBoxRight');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Month is zero-based, so we add 1
    const year = now.getFullYear();

    // Get the "date" element by its id and update its innerHTML
    const dateElement = document.getElementById('toDayDate');
    if (dateElement) {
      dateElement.innerHTML = `${day}/${month}/${year}`;
    }
  }, []); 
  

    
     
      // Update the date elemen

 
  const handleTableClick = (i) => {
    if(RightPopUp.style.display=="none"){
        RightPopUp.style.display="block";
        RightPopUp.style.cssText="animation: right-popUpOpen .6s ease;";
        selectedIcon[i].style.display="block";
    }else{
        selectedIcon[i].style.display="none";
        RightPopUp.style.display="none";  
    }
    // setRightPopUpVisible((prevVisible) => !prevVisible);
    
  };

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
    <div className="scollBoxReservation" id="scollBox" >
    <div class="fpmbg" id="fpmbg">
        
            <div className="table8Box tableBox">
                 <div className={`table8a table8 table ${hoveredTable === 0 ? 'hovered' : ''}`} 
                 onClick={() => handleTableClick(0)}
                 onMouseOver={() => handleTableMouseOver(0)}
                 onMouseOut={() => handleTableMouseOut(0)}
                 >
                    <div className="selectedBorder"></div>
                  </div>     
                
                <div className={`table8b table8 table ${hoveredTable === 1 ? 'hovered' : ''}`} 
                onClick={() => handleTableClick(1)}
                onMouseOver={() => handleTableMouseOver(1)}
                onMouseOut={() => handleTableMouseOut(1)}
                >
                    <div className="selectedBorder"></div>
                </div>
                
            </div>
            
            <div className="table4Box tableBox" >
                <div className="table4Flex">
                    <div className={`table4a table4 table4Left table ${hoveredTable === 2 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(2)}
                     onMouseOver={() => handleTableMouseOver(2)}
                     onMouseOut={() => handleTableMouseOut(2)}
                     >
                        <div className="selectedBorder"></div>
                        </div>
    
                        
                        <div className={`table4b table4 table4Right table ${hoveredTable === 3 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(3)}
                     onMouseOver={() => handleTableMouseOver(3)}
                     onMouseOut={() => handleTableMouseOut(3)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
                        
                    
                </div>
                <div className="table4Flex">
                
                <div className={`table4c table4 table4Left table ${hoveredTable === 4 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(4)}
                     onMouseOver={() => handleTableMouseOver(4)}
                     onMouseOut={() => handleTableMouseOut(4)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
                   
                    <div className={`table4d table4 table4Right table ${hoveredTable === 5 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(5)}
                     onMouseOver={() => handleTableMouseOver(5)}
                     onMouseOut={() => handleTableMouseOut(5)}
                     >
                        <div className="selectedBorder"></div>
                    </div>

                </div>
                <div className="table4Flex">
                
                <div className={`table4e table4 table4Left table ${hoveredTable === 6 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(6)}
                     onMouseOver={() => handleTableMouseOver(6)}
                     onMouseOut={() => handleTableMouseOut(6)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
    
                    
                    <div className={`table4f table4 table4Right table ${hoveredTable === 7 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(7)}
                     onMouseOver={() => handleTableMouseOver(7)}
                     onMouseOut={() => handleTableMouseOut(7)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
                        
                    
                </div>
               
            </div>
            
            <div className="table12Box tableBox">
            
            <div className={`table12a table12 table12Left table ${hoveredTable === 8 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(8)}
                     onMouseOver={() => handleTableMouseOver(8)}
                     onMouseOut={() => handleTableMouseOut(8)}
                     >
                    <div className="selectedBorder"></div>
                </div>
    
                
                <div className={`table12a table12 table12Right table ${hoveredTable === 9 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(9)}
                     onMouseOver={() => handleTableMouseOver(9)}
                     onMouseOut={() => handleTableMouseOut(9)}
                     >
                    <div className="selectedBorder"></div>
                </div>
            </div>
            <div className="table2Box tableBox">
                <div className="table2Flex">
                
                <div className={`table2a table2 table2Left table ${hoveredTable === 10 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(10)}
                     onMouseOver={() => handleTableMouseOver(10)}
                     onMouseOut={() => handleTableMouseOut(10)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
    
                    
                    <div className={`table2b table2 table2Right table ${hoveredTable === 11 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(11)}
                     onMouseOver={() => handleTableMouseOver(11)}
                     onMouseOut={() => handleTableMouseOut(11)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
                </div>
                <div className="table2Flex">
                
                <div className={`table2c table2 table2Left table ${hoveredTable === 12 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(12)}
                     onMouseOver={() => handleTableMouseOver(12)}
                     onMouseOut={() => handleTableMouseOut(12)}
                     >
                        <div className="selectedBorder"></div>
                    </div>
    
                    
                    <div className={`table2d table2 table2Right table ${hoveredTable === 13 ? 'hovered' : ''}`}
                     onClick={() => handleTableClick(13)}
                     onMouseOver={() => handleTableMouseOver(13)}
                     onMouseOut={() => handleTableMouseOut(13)}
                     >
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
                            
                            <p className="date" id='toDayDate'>Today</p>
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
