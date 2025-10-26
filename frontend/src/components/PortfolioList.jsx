import {useContext, useEffect, useState} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import {Link, useNavigate} from 'react-router-dom'
import {FaArrowRight, FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

let PortfolioList=()=>{

    let images=['pr1.jpg','pr2.jpg','pr3.jpg','pr4.jpg'];
    let rnd=Math.floor(Math.random()*images.length);

          let {
              getPortfolio,
              allPortfolioData,
              setAllPortfolioData,
              userId,
              setUserId,
              filteredData,
              setFilteredData,
                selectedRecord,
              setSelectedRecord,
              setActiveSection,

          }=   useContext(PortfolioContext)

       let navigate=  useNavigate()

    //let [template,setTemplate]=useState('')

    useEffect(()=>{

            getPortfolio();


    },[])


    let viewButtonClick=(id,template)=>{
                    console.log('id=',id)
                    setUserId(id) //setting user id to find this user data later
        console.log('template=',template)
        navigate(template==='t1'?'/portfolio1':'/portfolio2')//now go to that user's template page
    }


    let editClick=(item)=>{

              setSelectedRecord(item)
        setActiveSection('basic')

        navigate('/sectionTab')

    }

    let deleteClick=async (item)=>{

      let ans=window.confirm("Are you sure to delete this profile?")

        if(ans)
        {
            await axios.delete(`http://localhost:3000/api/delete/${item._id}`)
            toast.success('Portfolio Deleted ')

        }

        getPortfolio()

    }

    return(

        <>
           <ToastContainer/>

            {/*main container */}
            <div className="w-full h-full max-w-screen p-10 border-2 border-gray-200 bg-amber-50 rounded-3xl m-3">

                {/* grids */}

                {
                    filteredData.length>0?
                        <div className="grid grid-cols-4 gap-4">
                            {
                                filteredData.map((item, index) =>
                                    <div key={index}>


                                        <div
                                            className="max-w-sm   bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:translate-0.5">

                                            {
                                                item.hero.profileImage
                                                    ? <img className="rounded-t-lg" src={`http://localhost:3000/uploads/${item.hero.profileImage}`} alt=" "/>
                                                    :
                                                    <img className="rounded-t-lg" src={`http://localhost:3000/uploads/${images[rnd]}`} alt=" "/>
                                            }

                                            <div className="p-5">

                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {item.basic.name}</h5>

                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    👨🏻‍💻{item.basic.title}

                                                </p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                                                    💻{item.basic.role}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                                                    📌{item.hero.tagline}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                                                    📍{item.about.location}
                                                </p>
                                                Skills :

                                                {item.skills.map((it,index) =>
                                                        <span className="mb-3 font-normal text-gray-700 dark:text-gray-400 m-1">

                                                {it.name}
                                            </span>
                                                )}

                                                <hr className='bg-amber-50'/>
                                                <div className="flex items-center justify-between p-2">
                                                    <button onClick={() => viewButtonClick(item._id,item.template)}
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
                                               text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4
                                               focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                                               dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                        View Portfolio
                                                        <FaArrowRight />
                                                    </button>
                                                    <FaEdit className='cursor-pointer text-xl text-emerald-600' onClick={()=>editClick(item)} />
                                                    <MdDelete className='cursor-pointer text-xl text-red-600' onClick={()=>deleteClick(item)} />
                                                </div>

                                            </div>
                                        </div>




                                    </div>
                                )

                            }
                        </div>
                        :<h1 className='text-red-600 text-3xl'>No Record Found</h1>



                }


            </div>


        </>


    )


}

export default PortfolioList;