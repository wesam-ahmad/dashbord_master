import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useEffect, useState } from "react";
import axios from "axios";

export function AboutUs() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');


  const [about, setAbout] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8181/getTeam')
      .then((response) => {
        setAbout(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error.message))
  }, [])



  const handleTeam = (e, userInfo) => {
    e.preventDefault();
    console.log(name, role, github, linkedin);
    console.log(userInfo)
    let x = userInfo.id
    axios
      .put(`http://localhost:8181/editTeam/${x}`, {
        name: name,
        role: role,
        github: github,
        linkedin: linkedin,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <div>
      <section className="flex items-center py-10 bg-stone-100 xl:h-screen font-poppins dark:bg-white-300"
      >
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-photo/diverse-businesspeople-having-meeting_53876-103954.jpg?w=1380&t=st=1685543448~exp=1685544048~hmac=aed33e88652f280146a7d522b2c9c1f01daf545354b2b502b6efea3d12e886c8"
                  alt=""
                  className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                />
                <div className="absolute z-10 hidden w-full h-full bg-[#82CD47] rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
                <div className="absolute z-50 text-[#82CD47] transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="w-14 h-14 bi bi-play-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="relative">
                <h1 className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-black opacity-5 md:block hidden">
                  About Us
                </h1>
                <h1 className="pl-2 text-3xl font-bold border-l-8 border-[#82CD47] md:text-5xl text-black-300">
                  Welcome to our site
                </h1>
                <input type="text" placeholder="edit title here" className="mt-10 border border-black border-solid border-radius-25 rounded-lg" />
              </div>
              <p className="mt-6 mb-10 text-base leading-7 text-gray-800 dark:text-gray-800">
                Welcome to our website, the leading platform for booking sports fields and playgrounds. We strive to provide a seamless and convenient experience for sports enthusiasts and athletes to reserve their preferred venues.</p>
              <input type="text" placeholder="edit vision here" className="border border-black border-solid border-radius-25 rounded-lg" />

            </div>
          </div>
        </div>
      </section >



      <div>
        <div className="container flex justify-center mx-auto pt-16">
          <div>
            <p className="text-gray-500 text-lg text-center font-normal pb-3">Meet our team</p>
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">Those who work behind the scene</h1>
          </div>
        </div>
        {about.map((aboutus) => (
          <form onSubmit={(e) => handleTeam(e, aboutus)} className="w-full bg-gray-100 px-10 pt-10" key={aboutus.id}>
            <div className="container mx-auto">
              <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                  <div className="rounded overflow-hidden shadow-md bg-white">
                    <div className="absolute -mt-20 w-full flex justify-center"></div>
                    <div className="px-6 mt-16">
                      <div className="font-bold text-3xl text-center pb-1">{aboutus.name}</div>
                      <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
                      <input
                        className="border border-black border-solid"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p className="text-gray-800 text-sm text-center">{aboutus.role}</p>
                      <input
                        className="border border-black border-solid"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      {/* <p className="text-center text-gray-600 text-base pt-3 font-normal">{about.description}</p> */}
                      <div className="w-full flex justify-center pt-5 pb-5">
                        <a href={aboutus.github} className="mx-5">
                          <input
                            className="border border-black border-solid"
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                          />
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                          </div>
                        </a>
                        <a href={aboutus.linkedin} className="mx-5">
                          <input
                            className="border border-black border-solid"
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                              <path d="M21 2H3C1.89 2 1 2.89 1 4V20C1 21.11 1.89 22 3 22H21C22.11 22 23 21.11 23 20V4C23 2.89 22.11 2 21 2Z" />
                              <path d="M9 17H5V9H9V17Z" />
                              <path d="M7 7C6.45 7 6 6.55 6 6C6 5.45 6.45 5 7 5C7.55 5 8 5.45 8 6C8 6.55 7.55 7 7 7Z" />
                              <path d="M21 17H17V12.81C17 11.74 16.33 11 15.32 11C14.37 11 14 11.74 14 12.65V17H10V9H14V10.45C14.5 9.64 15.57 9 16.82 9C19.35 9 21 10.62 21 13.36V17Z" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                    <button type="submit">ediiiit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ))}



      </div>

    </div>
  );
}

export default AboutUs;