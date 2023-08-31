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
import { DressesData } from "@/data";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export function Dresses() {
;

const [Dresses, setDresses] = useState([]);

useEffect(() => {
axios
  .get("http://localhost:8181/getdresswithuser")
  .then((response) => {
    const fetchedDresses = response.data;
    const sortedDresses = fetchedDresses.sort((a, b) => a.id - b.id);
    setDresses(sortedDresses);
  })
  .catch((error) => {
    console.error("Error retrieving data:", error);
  });
}, []);

console.log(Dresses);

const [isDeleted, setIsDeleted] = useState(false);

useEffect(() => {
axios
 .get("http://localhost:8181/getdresshwithuser")
 .then((response) => {
   const fetchedDresses = response.data;
   const sortedDresses = fetchedDresses.sort((a, b) => a.id - b.id);
   setDresses(sortedDresses);
 })
 .catch((error) => {
   console.error("Error retrieving data:", error);
 });
  
}, );

const handleEditClick = async (id, STATE) => {
  const value = STATE ? true : false;
      if (!STATE) {
    const confirmed = await showConfirmationPrompt();
  
    if (!confirmed) {
      return; 
    }
  }
  
  axios
    .put(`http://localhost:8181/dress/${id}/${value}`)
    .then((response) => {
      console.log(response.data); 
      setIsDeleted(!isDeleted);
    })
    .catch((error) => {
      console.error(error);
    
    });
  
  console.log(`Edit clicked for dress ID: ${id}`);
};
const showConfirmationPrompt = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Are you sure you want to DELETE this dress?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};

  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient"style={{ backgroundColor: '#FBC5C5' }} className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="black">
              Dresses Table
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Id Dress",
                  
                  "Dress Name",
                  "description",
                  "Price",
                  "Size",
                  "Color",
                  "User Name",
                  "Approve",
                  
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
              {Dresses.map(
                (
                  { id, name,description,price, size,color,user_name,State },
                  key
                ) => {
                  const className = `py-3 px-5  ${
                    key === DressesData.length - 1
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
                          {description}
                        </Typography>
                      </td>
                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {price}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="ml-2 text-xs font-semibold text-blue-gray-600">
                          {size}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="ml-2 text-xs font-semibold text-blue-gray-600">
                          {color}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="ml-2 text-xs font-semibold text-blue-gray-600">
                          {user_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold  text-blue-gray-600">
                          {State? "APPROVED" : "NOT APPROVED"}
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="grid grid-cols-2 justify-center gap-2">
                          <div className="justify-center">
                            <IconButton
                              className="mr-4 xl:mr-0"
                              style={{backgroundColor: '#FBC5C5'}}
                              onClick={() => handleEditClick(id, true)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </IconButton>
                          </div>
                          <div className="justify-center">
                            <IconButton
                              onClick={() => handleEditClick(id, false)}
                              
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

export default Dresses;