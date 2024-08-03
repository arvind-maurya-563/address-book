import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import '../styles/booklist.css';
import { AddressListTable } from './AddressBoolLIst';
import { getApiUrl, getSecureKey } from '../components/apiComponent';
import { useNavigate } from 'react-router-dom';
import { LoaderComponentData } from '../components/LoaderComponent';
import AlertModal from './Modal';
import { ContactForm } from './AddContactPage';
const ContactList = () => {
  const [BookList, setAddressBookList] = useState([]);
  const [page, setPage] = useState(0);
  const [pagesize, setPageSize] = useState(5);
  const [totalSize, setTotalSize] = useState(0);
  const [isLoading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/login');
    } else {
      getAddressBookData();
      const username = sessionStorage.getItem('name') || 'user';
      setName(username);
    }
  }, [page,pagesize]);
  const getAddressBookData = async () => {
    try {
        setloading(true);
        const response = await fetch(`${getApiUrl()}/api/contacts?page=${page+1}&limit=${pagesize}`,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "SecureKey": getSecureKey({page: page+1+"",limit:pagesize+""})
          },
        });
        const data = await response.json();
        setloading(false);
        if(data.status){
          setTotalSize(data.total);
          setAddressBookList(data.data);
        }else{
          setloading(false);
          setMessage(response.message);
          setOpen(true);
        }
    } catch (error) {

    }
  }
  const handleClose = () => {
    setOpen(false);
    getAddressBookData();
  };
  const createData = async(data)=>{
    try {
      setloading(true);
      const userData = await fetch(`${getApiUrl()}/api/contacts`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "SecureKey": getSecureKey(data)
        }
      })
      const response = await userData.json();
      setloading(false);
      setMessage(response.message);
      setOpen(true);
      
     } catch (error) {
      setloading(false);
      setMessage(error.message);
      setOpen(true);
      
     }
  };
  const onSubmit = (data)=>{
    createData(data);
  }
  const handleAddnew = (data)=>{
    setNewOpen(false);
    if(data?.fullName){
      onSubmit(data)
    }
  }
  const handleLogout = ()=>{
     sessionStorage.clear();
     navigate('/login');
  }
  const handleChangePage = (event, newPage) => {
    console.log(event,newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
    getAddressBookData();
  };
  const deleteData = async(data)=>{
    try {
      setloading(true);
      const userData = await fetch(`${getApiUrl()}/api/contacts?id=${data.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "SecureKey": getSecureKey({id: data.id+""})
        }
      })
      const response = await userData.json();
      setloading(false);
      setMessage(response.message);
      setOpen(true);
     } catch (error) {
      setloading(false);
      setMessage(error.message);
      setOpen(true);
      
     }
  };
  const updateData = async(data)=>{
   try {
    setloading(true);
    const userData = await fetch(`${getApiUrl()}/api/contacts`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "SecureKey": getSecureKey(data)
      }
    })
    const response = await userData.json();
    setloading(false);
    setMessage(response.message);
    setOpen(true);
    
   } catch (error) {
    setloading(false);
    setMessage(error.message);
    setOpen(true);
    
   }
  };
  const deleteEditHappend = (data)=>{
    console.log(data)
    if(data?.deleted){
      deleteData(data);
    }else if(data?.fullName){
      updateData(data)
    }
  }

  const AddNewContact = ()=>{
    setNewOpen(true);
  }
  return (
     <div>
      <div className='backgounddiv'></div>
      { open && <AlertModal
          handleClose={handleClose}
          open={open}
          message={message}
        />}
        {isLoading && <LoaderComponentData /> }
        { newOpen && <ContactForm
          handleClose={handleAddnew}
          open={newOpen}
          data={{}}
        />}
       <div className='booklistHeading'>
        <div className='mainheading'>
           <p>
            Manage Your Address Book
            </p>
           <p>Your Booklist</p>
        </div>
        <div className='secondheading'>
          <p>
          <PersonIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Welcome {name}
            </p>
          <p>
          <Button 
          variant="contained" 
          sx={{ bgcolor: '#007bff' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
          </p>
        </div>
       </div>
      <div className='tablewrapper'>
        <div className='addnew'>
          <Button variant="contained" 
          sx={{ bgcolor: '#007bff' }} onClick={AddNewContact}>Add New</Button>
        </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <AddressListTable BookList={BookList} deleteEditHappend={deleteEditHappend} />
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalSize}
          rowsPerPage={pagesize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    </div>
  );
};

export default ContactList;
