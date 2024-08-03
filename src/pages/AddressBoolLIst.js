import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ContactForm } from './AddContactPage';
export const AddressListTable = ({ BookList, deleteEditHappend }) => {
  const [newOpen, setNewOpen] = React.useState(false);
  const [editdata, setEditData] = React.useState({});
  const handleAddnew = (data)=> {
    setNewOpen(false)
    deleteEditHappend(data);
  };
  const handleDelete = (id)=>{
    deleteEditHappend({id, deleted: true})
  };
  const handleEdit = (data)=>{
    setEditData(data);
    setNewOpen(true);
  };
  
  return (
    <>
    { newOpen && <ContactForm
          handleClose={handleAddnew}
          open={newOpen}
          data={editdata}
        />}
    <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow className='tablerowss'>
            <TableCell>Full Name</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email Id</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Group Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BookList.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                <TableCell>
                    {row.fullName}
                </TableCell>
                <TableCell>
                    {row.dob.substring(0,10)}
                </TableCell>
                <TableCell>
                    {row.contactNumber}
                </TableCell>
                <TableCell>
                    {row.email}
                </TableCell>
                <TableCell>
                    {row.website}
                </TableCell>
                <TableCell>
                    {row.groupname}
                </TableCell>
                <TableCell>
                <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleEdit(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
  </TableContainer>
  </>
  );
};
