import {Route, Routes, useNavigate,Outlet} from "react-router-dom";
import BasicInfoForm from "../forms/BasicInfoForm.jsx";
import AboutForm from "../forms/AboutForm.jsx";
import HeroForm from "../forms/HeroForm.jsx";
import BlogForm from "../forms/BlogForm.jsx";
import ContactForm from "../forms/ContactForm.jsx";
import ProjectsForm from "../forms/ProjectsForm.jsx";
import ServicesForm from "../forms/ServicesForm.jsx";
import SkillsForm from "../forms/SkillsForm.jsx";
import TestimonialsForm from "../forms/TestimonialsForm.jsx";
import {useContext, useEffect, useState} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

let SectionTabs=()=>{

        let sections=["basic",
            "hero",
            "about",
            "skills",
            "services",
            "projects",
            "testimonials",
            "blog",
            "contact",]

        let navigate=  useNavigate()




    let {

            activeSection,
        setActiveSection,
        submitPortfolio,
        selectedRecord,
        setSelectedRecord,
        portfolioData,
        setPortfolioData,
        initialPortfolioData,
        nameRef ,
        titleRef ,
        roleRef ,
        taglineRef ,
        locationRef ,
        emailRef,
        phoneRef,


        }=useContext(PortfolioContext)

    let buttonForSectionSelect=(section)=>{

        setActiveSection(section)

    }


    let render=()=>{


            console.log('render  ',activeSection);
            switch(activeSection){
                case "basic":
                    return <BasicInfoForm/>
                case "hero":
                    return <HeroForm/>

                case "about":
                    return <AboutForm/>
                case "skills":
                    return <SkillsForm/>
                case "services":
                    return <ServicesForm/>
                case "projects":
                    return <ProjectsForm/>
                case "testimonials":
                    return <TestimonialsForm/>
                case "blog":
                    return <BlogForm/>
                case "contact":
                    return <ContactForm/>
                case "project":
                    return <ProjectsForm/>


            }

    }

    let submitButtonClick=async ()=>{
            console.log('submit')


        if(!portfolioData.basic.name.trim())
        {
            alert("Please enter a name")
           nameRef.current?.focus()
            return;
        }
        if(!portfolioData.basic.title.trim())
        {
            alert("Please enter a title")
            titleRef.current?.focus()
            return;
        }
        if(!portfolioData.basic.role.trim())
        {
            alert("Please enter a role")
            roleRef.current?.focus()
            return;
        }
        if(!portfolioData.hero.tagline.trim())
        {
            alert("Please enter a tagline")
            taglineRef.current?.focus()
            return;
        }
        if(!portfolioData.about.location.trim())
        {
            alert("Please enter a location")
            locationRef.current?.focus()
            return;
        }
        if(!portfolioData.contact.email.trim())
        {
            alert("Please enter a email")
            emailRef.current?.focus()
            return;
        }
        if(!portfolioData.contact.phone.trim())
        {
            alert("Please enter your phone number")
            phoneRef.current?.focus()
            return;
        }

        if(!selectedRecord)
        {

            console.log('portfolio data before submit : ',portfolioData)
            let ans=window.confirm('Are you sure  to  submit?',)
            if(ans)
            {
                submitPortfolio()
                toast.success(' Portfolio created Successfully  ')
            }

        }
        else{
            let id=selectedRecord._id;
            console.log('changed record : ',portfolioData)

            let ans=window.confirm('Are you sure  to  make change to this profile?',)
            if(ans){
                await axios.put(`http://localhost:3000/api/edit/${id}`,portfolioData)
                toast.success('Portfolio Successfully updated   ')

            }


        }
        setSelectedRecord('')
        navigate('/portfolioList')

    }


    useEffect(() => {
        // setting for edit record
        if(selectedRecord)
            setPortfolioData(selectedRecord)
        else
            setPortfolioData(   prev=> ({...initialPortfolioData,template:prev.template})    )

        console.log('use effect of section tab runs..');
    }, [selectedRecord]);


    console.log('app runs')

    return(


        <>

            {/* main area */}
            <div className="flex  flex-col  py-10  w-screen h-screen">

                {/*   buttons area  */}
                <div className={'flex bg-blue-400 w-full  h-10 rounded-full p-10 items-center justify-center' }>
                    {
                        sections.map((section,index)=>

                        <button onClick={()=>buttonForSectionSelect(section)}     className={ section===activeSection ?
                            `w-30 h-6   bg-red-500  text-white text-sm rounded-full shadow-lg hover:translate-0.5 cursor-pointer`
                        : `w-30 h-6  bg-amber-400   text-white text-sm rounded-full shadow-lg hover:translate-0.5 cursor-pointer`
                                }>{section}</button>
                        )
                    }


                </div>




               <div>
                   {render()}
               </div>



                <div className="flex w-full h-40 justify-center items-center">
                    <button onClick={submitButtonClick}  className="bg-red-500 rounded-full px-10 text-amber-50 text-md text-bold py-1 m-1 cursor-pointer hover:translate-y-0.5">
                        Submit</button>

                </div>


                <div className='flex justify-center items-center'>
                    <button   className="bg-blue-400 rounded-full px-10 text-amber-50 text-sm py-1 m-1 cursor-pointer hover:translate-y-0.5">
                        Save Draft</button>
                </div>


            </div>










        </>


    )


}

export default SectionTabs;