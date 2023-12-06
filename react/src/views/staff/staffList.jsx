import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'select2/dist/css/select2.min.css';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import axiosClient from "../../axios-client.js";
import Swal from 'sweetalert2';


export default function StaffList() {
    const tableStyle = {
        borderCollapse: "collapse",
        borderSpacing: 0,
        width: "100%",
      };

      const [staffList,setStaffList] = useState([]);
      const [loading, setLoading] = useState(false);
      useEffect(()=>{
        getStaff();
      },[])

      const getStaff =()=>{
        axiosClient.get('/getStaff')
        .then(({data}) =>{
           setLoading(false)
           setStaffList(data.staffMembers)
        
        })
        .catch((error)=>{
           setLoading(false)
           console.error('API request error:', error);
        });
      }
      const deleteStaff = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              axiosClient.delete(`/deleteUsers/${id}`)
              .then(({data}) =>{
                Swal.fire(
                    'Deleted!',
                    data.name+' account has been deleted.',
                    'success'
                  )
                  
                  getStaff()
             })
            
            }
          })
      }
      const getRoleLabel = (role) => {
        switch (role) {
            case 1:
                return 'Staff';
            case 2:
                return 'Admin';
            case 3:
                return 'Delivery Man';
            default:
                return '';
        }
    };
    
    const handleRoleChange = (id, newRole) => {
        const updatedRole = staffList.map((staff) =>
            staff.id === id ? { ...staff, role: newRole } : staff
        );
    
        setStaffList(updatedRole);
    };
    
    const handleSearchChange = (e) => {
        const query = e.target.value;
        console.log("cuqar:", query);
        if(query==""){
            getStaff(); 
        }else{
            axiosClient.get(`/searchStaff/${query}`)
            .then((response) => {
                console.log("search result:", response);
                setStaffList(response.data.users);  // Assuming the response structure has a 'users' key
            })
            .catch((error) => {
                console.error('Error searching meals:', error);
            });
        }
        
        
    }
    
      var staffDetail = "";
      staffDetail = staffList.map((item,index) =>(
            <tr>
            <td>
                <div class="form-check">
                   {index+1}
                </div>
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.phone}</td>
            <td id={"tooltip-container" + index}>
            <Select
                value={{
                    value: item.role,
                    label: getRoleLabel(item.role)
                }}
                onChange={(selectedOption) => handleRoleChange(item.id, selectedOption.value)}
                options={[
                    { value: 2, label: 'Admin' },
                    { value: 1, label: 'Staff' },
                    { value: 3, label: 'Delivery Man' },
                ]}
            />
        </td>

            <td id={"tooltip-container"+index}>
                <a href={"/updateingredient/"+item.id} class="me-3 text-primary" data-bs-container={"#tooltip-container"+index} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
                <button class="text-danger" onClick={en => deleteStaff(item.id)} data-bs-container={"#tooltip-container"+index} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></button>
            </td>
        </tr>
     
      ));
     

    return(
        <div>
            <div class="main-content">
        <Helmet> <link rel="stylesheet" href="../../../assets/css/addIngredient.css" /></Helmet>
<div class="page-content">
    <div class="container-fluid">

   
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Staff</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Staff</a></li>
                            <li class="breadcrumb-item active">Staff List</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
       

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div className='Flex'>
                            <a href="/addStaff" class="btn btn-success mb-2"><i class="mdi mdi-plus me-2"></i> Add Staff</a>
                            <div className="searchBox">
                            <input
                                type="search"
                                placeholder="Search by name......"
                               
                                onChange={handleSearchChange}
                            />
                            </div>
                        </div>
                        <div class="table-responsive mt-3">
                            <table class="table table-centered datatable dt-responsive nowrap" style={tableStyle}>
                                <thead class="thead-light">
                                    <tr>
                                        <th style={{width: "20px"}}>
                                            <div class="form-check">
                                                No.
                                            </div>
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th style={{width: "120px"}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                        <td colSpan="4">Loading...</td>
                                        </tr>
                                    ) : (
                                        staffDetail
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    </div> 
</div>



</div>
        </div>
    );
}