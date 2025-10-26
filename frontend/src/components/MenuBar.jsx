import {Link, useNavigate} from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import axios from "axios";

let MenuBar=()=>{

    let {getPortfolio,allPortfolioData,setFilteredData,filteredData, setAllPortfolioData}=   useContext(PortfolioContext)

    let [roles, setRoles] = useState([])
    let [locations, setLocation] = useState([])
     let navigate= useNavigate()

    let setRolesAndLocation=()=>{

        let loc= new Set(allPortfolioData.map((item)=>item.about.location))
        setLocation([...loc])

        let role= new Set(allPortfolioData.map((item)=>item.basic.role))
        console.log(role)
        setRoles([...role])
    }

    useEffect(()=>{


        setRolesAndLocation()

    },[allPortfolioData])


    let [inputBox,setInputBox] = useState('');

    let [roleComboBoxData,setRoleComboBoxData] = useState('');
    let [locationComboBoxData,setLocationComboBoxData] = useState('');

    useEffect(()=>{

        setFilteredData(allPortfolioData)


        //searching
        let search=async()=>{


            let query={}

            //searching on name / title
            if(inputBox.trim()){
                query.searchData=inputBox;
                let r= await  axios.get('http://localhost:3000/api/search',{params:query})
                console.log(r.data)
                setFilteredData(r.data)

            }

            //searching on role
            if(roleComboBoxData.trim()){
                query.searchData=roleComboBoxData;
                let r= await  axios.get('http://localhost:3000/api/searchRole',{params:query})
                console.log(r.data)
                setFilteredData(r.data)
                setInputBox('')
            }


            //searching on location
            if(locationComboBoxData.trim()){
                query.searchData=locationComboBoxData;
                let r= await  axios.get('http://localhost:3000/api/searchLocation',{params:query})
                console.log(r.data)
                setFilteredData(r.data)
                setInputBox('')
            }


            // only navigate when user searched something
            if (inputBox.trim() || roleComboBoxData.trim() || locationComboBoxData.trim()) {
                navigate('/portfolioList');
            }

        }

        search()





    },[inputBox,roleComboBoxData,locationComboBoxData])

    return (

        <>
            {/* main */}
            <div className='flex flex-col  justify-between items-center h-40 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 text-white shadow-lg px-2 '>

                {/* ✅ Home Button (top-left) */}
                <Link
                    to="/"
                    className="text-amber-600  text-3xl font-semibold  rounded-md shadow hover:bg-amber-100 hover:scale-105 transition-transform"
                >
                    🏡
                </Link>
                {/* top */}
                <h3 className={'text-3xl font-bold text-white hover:translate-0.5 hover:shadow-lg hover:text-red-600'}><Link to={'/'}>Portfolio Generator App</Link> </h3>

                {/*bottom*/}
                <div className={'flex    justify-between w-full py-4 font-semibold border-t border-gray-200'}>
                    {/*left side filter on name or title */}
                    <input type='text'  value={inputBox} onChange={(e)=>setInputBox(e.target.value)}
                           placeholder={'Search by name or title...'} className={'bg-blue-600 border border-blue-400 text-white focus:ring-2 focus:ring-amber-300 rounded-lg px-2 py-1 placeholder:text-blue-100 '}/>

                    <div>
                    {/*    middle*/}
                        <Link to={'/portfolioList'} className={'text-lg  text-amber-200 hover:text-white font-semibold'}>
                            Portfolio List</Link>
                    </div>

                    {/*right side*/}
                    <div className={'flex  justify-between items-center space-x-4 border-amber-50'}>
                        <div className='border border-gray-200 hover:border-gray-400'>
                            <select className={'bg-blue-600 text-white border border-blue-400 hover:border-amber-300 focus:ring-2 focus:ring-amber-300 rounded-md px-2 py-1 cursor-pointer'} onChange={(e)=>setRoleComboBoxData(e.target.value)}>
                                <option value={''}>All Professionals</option>
                                {
                                    roles.map((item,index)=>
                                        <option value={item}>{item}</option>
                                    )
                                }



                            </select>

                        </div>
                        <div className={'border border-gray-200 hover:border-gray-400'}>
                            <select className={'bg-blue-600 text-white border border-blue-400 hover:border-amber-300 focus:ring-2 focus:ring-amber-300 rounded-md px-2 py-1 cursor-pointer'} onChange={(e)=>setLocationComboBoxData(e.target.value)}>
                                <option value={''}>All Locations</option>

                                {
                                    locations.map((item,index)=>
                                        <option value={item}>{item}</option>
                                    )
                                }



                            </select>

                        </div>
                    </div>

                </div>
            </div>


        </>

    )


}

export default MenuBar;