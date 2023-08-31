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
import { bookingData } from "@/data";
import axios from "axios";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";







export function Booking() {
  const [bookings, setbookings] = useState([])


  const handledelete = async (id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8181/bookings/${id}`);
          getbookings()// Refresh data after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to soft delete this row?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, soft delete it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  const getbookings = () => {

    axios.get('http://localhost:8181/bookings')
      .then(response => {
        setbookings(response.data.rows)
      })
      .catch(error => {
        console.error(error);
      })
    // setbookings(response.date.rows)
  }

  useEffect(() => {
    getbookings()
  }, [])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 " >
      <Card>
        <CardHeader variant="gradient" style={{backgroundColor: '#FBC5C5'}} className="mb-8 p-6">
          <div className="grid grid-cols-6 gap-x-8 justify-end">
            <Typography variant="h6" color="black">
              Booking Table
            </Typography>

            <Typography
              as="a"
              href='booking/add'
              className="text-xs font-semibold text-blue-gray-600 justify-center"
            >
             
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["bookingID", " product_id ", "user_id", "fromdate", "todate", "status","dayscount","price", "Action"].map((el) => (
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
              {bookings.map(
                ({ id, product_id , user_id, from_date, to_date, status,days_count , price  }, key) => {
                  const className = `py-3 px-5 ${key === bookings.length - 1
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
                          {product_id}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user_id}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {from_date}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {to_date}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {status}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {days_count}
                        </Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {price}
                        </Typography>

                      </td>


                      <td className={className}>
                        <div className="grid grid-cols-2 gap-2 justify-center">
                        
                          <div className="justify-center">
                            

                              <IconButton color="red" onClick={() => { handledelete(id) }}>
                                <i className="fa-solid fa-trash" ></i>
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

export default Booking;