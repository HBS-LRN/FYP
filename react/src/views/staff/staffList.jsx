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
      const deleteIngredient = ingredientID =>{
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
              axiosClient.delete(`/ingredients/${ingredientID}`)
              .then(({data}) =>{
                Swal.fire(
                    'Deleted!',
                    data.ingredient_name+' has been deleted.',
                    'success'
                  )
                  
                  getIngredient()
             })
            
            }
          })
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
            <td>{item.active_member}</td>
            <td id={"tooltip-container"+index}>
                <a href={"/updateingredient/"+item.id} class="me-3 text-primary" data-bs-container={"#tooltip-container"+index} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
                <button class="text-danger" onClick={en => deleteIngredient(item.id)} data-bs-container={"#tooltip-container"+index} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></button>
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
                        <div>
                            <a href="/addStaff" class="btn btn-success mb-2"><i class="mdi mdi-plus me-2"></i> Add Staff</a>
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
                                        <th>Account Active</th>
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


<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <script>document.write(new Date().getFullYear())</script> © Nazox.
            </div>
            <div class="col-sm-6">
                <div class="text-sm-end d-none d-sm-block">
                    Crafted with <i class="mdi mdi-heart text-danger"></i> by <a href="https://1.envato.market/themesdesign" target="_blank">Themesdesign</a>
                </div>
            </div>
        </div>
    </div>
</footer>
</div>
        </div>
    );
}