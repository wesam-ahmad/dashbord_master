import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export function Home() {

  const [dresses, setdresses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8181/getdresswithuser")
      .then((response) => {
        const fetchedPitches = response.data;
        const sortedPitches = fetchedPitches.sort((a, b) => a.id - b.id);
        setdresses(sortedPitches);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);
 
  const [usersData, setUsersData] = useState([]);

  // Fetch users data from the server
   useEffect(() => {
  
     axios
     .get("http://localhost:8181/usersData")
     .then((response) => {
       setUsersData(response.data);
     })
      .catch((error) => {
         console.error("Error retrieving data:", error);
      });
 }, []);
  console.log(usersData);

   const [bookings, setbookings] = useState([]);
   useEffect(() => {
  
     axios
      axios
        .get("http://localhost:8181/bookings")
        .then((response) => {
            setbookings(response.data.rows);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
 }, []);
  console.log(bookings);
  return (
    <>
      <div className="m-10 mx-auto grid max-w-screen-lg  gap-5 sm:grid-cols-3">
        <div className="px-4 py-6 shadow-lg shadow-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bg-rose-400 h-14 w-14 rounded-xl bg-red-400 p-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <p className="mt-4 font-medium">Users</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {usersData.length}
          </p>
          <button className="mt-6 h-10 w-28  rounded-lg bg-red-400 text-sm font-bold text-white shadow-lg hover:bg-red-700">
            <Link to={"/dashboard/Users"}>More info</Link>
          </button>
        </div>

        <div className="px-4 py-6 shadow-lg shadow-red-100">
          <svg
            fill="currentColor"
            className="h-14 w-14 rounded-xl bg-red-400 p-4 text-white"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.2 489.2"
          >
            <g>
              <g>
                <path
                  d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4
			c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
			c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
			c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4
			c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4
			c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1
			v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4
			c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8
			c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1
			v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4
			c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z
			 M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2
			z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9
			c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8
			c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9
			z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1
			c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7
			c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"
                />
              </g>
            </g>
          </svg>
          <p className="mt-4 font-medium">Dresses</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {dresses.length}
          </p>
          <button className="mt-6 h-10 w-28  rounded-lg bg-red-400 text-sm font-bold text-white shadow-lg hover:bg-red-700">
            <Link to={"/dashboard/Dresses"}>More info</Link>
          </button>
        </div>

        <div className="px-4 py-6 shadow-lg shadow-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 rounded-xl bg-red-400 p-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-medium">Revenue</p>
          <p className="mt-2 text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {bookings.length}
          </p>
          <button className="mt-6 h-10 w-28  rounded-lg bg-red-400 text-sm font-bold text-white shadow-lg hover:bg-red-700">
            <Link to={"/dashboard/booking"}>More info</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
