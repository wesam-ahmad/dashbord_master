import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
export function Notifications() {
 
      // State to store users data
  const [usersMessages, setUsersMessages] = useState([]);

  // Fetch users data from the server
  const getUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8181/usersMessages');
      setUsersMessages(response.data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  useEffect(() => {
    getUsersMessages();
   
  }, []);

    // Update the handleDelete function to remove the deleted user from the state
    const handleDelete = async (id) => {
        const confirmed = await showConfirmationPrompt();
        if (confirmed) {
          try {
            await axios.put(`http://localhost:8181/deleteMessage/${id}`);
            // Remove the deleted user from the state
            setUsersMessages(prevData => prevData.filter( Message=> Message.id !== id));
          } catch (error) {
            console.error(error);
          }
        }
      };
    
      // Update the getMessageData function to exclude soft-deleted Massege
      useEffect(() => {
        axios
          .get('http://localhost:8181/usersMessages')
          .then((response) => {
            // Filter out soft-deleted message
            const filteredData = response.data.filter(Message => !Message.deleted);
            // Update the usersData state with the filtered data
            setUsersMessages(filteredData);
          })
          .catch((error) => {
            console.error('Error fetching message data:', error);
          });
      }, []);
    
    
    
      const showConfirmationPrompt = () => {
        return new Promise((resolve) => {
          Swal.fire({
            title: "Are you sure you want to soft delete this message?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient"style={{ backgroundColor: '#FBC5C5' }} className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="black">
              Messages Table
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Id Message",
                  
                  " Name",
                  "Subject",
                  "Message",
                  "Action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersMessages.map(
                (
                  { id, name, email, subject, message },
                  key
                ) => {
                  const className = `py-3 px-5  ${
                    key === usersMessages.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {subject}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="ml-2 text-xs font-semibold text-blue-gray-600">
                          {message}
                        </Typography>
                      </td>
                  

                      <td className={className}>
                        <div className="grid grid-cols-2 justify-center gap-2">
                         
                          <div className="justify-center">
                            <IconButton
                              onClick={() =>handleDelete (id)}
                              
                              color="red"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;