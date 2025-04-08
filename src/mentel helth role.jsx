import React, { useEffect, useState } from 'react';
import './MentalHealthRole.css';
import axios from 'axios';



const MentalHealthRole = () => {
  const [roles, setRoles] = useState([])
//   // const [roles, setRoles] = useState([
// // //   //   { id: 1, name: 'Psychiatrist', createdDate:new Date().toLocaleString() ,active: true},
// // //   //   { id: 2, name: 'Neurology', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 3, name: 'Psychiatry', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 4, name: 'Nutrition', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 5, name: 'Orthopedic', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 6, name: 'Cardiologist', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 7, name: 'Therapist', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 8, name: 'HelthCare', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 9, name: 'pediatrics', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 10, name: 'Rheumatology', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 11, name: 'Psychiatrist', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 12, name: 'Neurology', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 13, name: 'Psychiatry', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 14, name: 'Nutrition', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 15, name: 'Orthopedic', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 16, name: 'Cardiologist', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 17, name: 'Therapist', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 18, name: 'HelthCare', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 19, name: 'pediatrics', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 20, name: 'Rheumatology', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 21, name: 'Psychiatrist', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 22, name: 'Neurology', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 23, name: 'Psychiatry', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 24, name: 'Nutrition', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 25, name: 'Orthopedic', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 26, name: 'Cardiologist', createdDate: new Date().toLocaleString(),active: true },
// // //   //   { id: 27, name: 'Therapist', createdDate: new Date().toLocaleString(),active: true},
// // //   //   { id: 28, name: 'HelthCare', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 29, name: 'pediatrics', createdDate: new Date().toLocaleString() ,active: true},
// // //   //   { id: 30, name: 'Rheumatology', createdDate: new Date().toLocaleString() ,active: true},

// //   ]);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRole, setNewRole] = useState('');
  const [editRole, setEditRole] = useState(null);




  const rolesPerPage = 10;

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice((currentPage - 1) * rolesPerPage, currentPage * rolesPerPage);

  const toggleStatus = (id) => {
    setRoles(roles.map(role => (role.id === id ? { ...role, active: !role.active } : role)));
  };


  const addRole = () => {
    if (!newRole.trim()) return;
    setRoles([...roles, { id: roles.length + 1, name: newRole, createdDate: new Date().toLocaleString(), active: true }]);
    setNewRole('');
  };

  const updateRole = (id, updatedName) => {
    setRoles(roles.map((role) => (role.id === id ? { ...role, name: updatedName } : role)));
    setEditRole(null);
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };


  const getCurrentTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };
  // console.log(getCurrentTime()); 

  let count = Math.ceil(roles.length / 10)


 
 let min;
 let max=currentPage * 10


 if(max <roles.length){
    
  max=currentPage * 10
  min=(currentPage * 10) - 9
 }
 else{
  max= roles.length
  min=(currentPage * 10) - 9
 }








  const API_URL = "https://dev-tw-apigateway.dreamstechnologies.com/api/super-admin/master/mental-health-role/list?page=1&limit=34&sortOrder=des&sortField=createdAt";  // Replace with your API URL
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2N2NhZGQ5ZDAxM2JiZjI0ZWFiMzRkMGMiLCJmdWxsbmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6InN1cGVyYWRtaW5AeW9wbWFpbC5jb20iLCJ1c2VyX3JvbGUiOiJzdXBlci1hZG1pbiJ9LCJpYXQiOjE3NDM5OTY4MjQsImV4cCI6MTc0NDA0MDAyNH0.4clbAE-FNR33c4XiIZ98D4BJ0qf4UAm2Tn3NoKQt_tY";  // Replace with your actual token

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
      console.log('Response Data:', response.data);
      setRoles(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };




  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="container">

      {/* Main Content */}
      <main className="main-content">
        <div className='ert'>
          <h3 className="heading ">Mental Health Role </h3>
          <nav class="breadcrumb">
            <a href="#">Home</a> /
            <a href="#">Master Data's</a> /
            <span>Mental Health Role</span>

          </nav>
        </div>

        {/* Add Role Form */}

        <div className="form-container">
          <h3 className="form-title">Add Mental Health Role</h3>
          <input
            className="input"
            placeholder="Enter Name"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button className="add-button" onClick={addRole}>Add</button>
        </div>

        {/* Roles Table */}
        <div className='search'>
          <h2 className="color">Mental Health Role</h2>

          <div className="search-container">
            <span className="search-icon"><img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/search--v1.png" alt="search--v1" /></span>
            <input
              className="search-input"
              type="text"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <table className="roles-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>
            {currentRoles.map((role, index) => (
              <tr key={role.id}>
                <td>{(currentPage - 1) * rolesPerPage + index + 1}</td>
                <td>
                  {editRole === role.id ? (
                    <input
                      value={role.name}
                      onChange={(e) => updateRole(role.id, e.target.value)}
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td>{role.createdAt}</td>




                <td>
                  {<label className="switch">
                    <input type="checkbox" checked={role.active} onChange={() => toggleStatus(role.id)} />
                    <span className="slider round"></span>
                  </label>}
                </td>
                <td>
                  <button className="edit-button" onClick={() => setEditRole(role.id)}>✎</button>
                  <button className="delete-button" onClick={() => deleteRole(role.id)}>🗑</button>
                </td>
              </tr>
            ))}




          </tbody>
        </table>

        <div className='art'>

          <div>
            <h4>Showing {min} to {max} of 34 entries</h4>

          </div>

          <div className="pagination">

            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>&laquo;&laquo;</button>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&raquo;&raquo;</button>
          </div>
        </div>

      </main>

    </div>


  );
};


export default MentalHealthRole;









