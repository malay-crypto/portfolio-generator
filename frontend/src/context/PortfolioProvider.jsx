import {createContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


//creating context
export const PortfolioContext = createContext();

//provider component
export const PortfolioProvider = ({ children }) => {

    //  1. Define the overall structure of  data
    //initial state of data

    const initialPortfolioData = {
        template: "",

        basic: { name: "", title:'',role: ""},

        hero: { tagline: "", profileImage: "", backgroundImage: "" },

        about: { bio: "", location: "", socials: [] },

        skills: [],

        services: [
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
        ],

        projects: [
            { title: "", image: "", description: "" },
            { title: "", image: "", description: "" },
            { title: "", image: "", description: "" },
        ],

        testimonials: [
            { clientName: "", quote: "" },
        ],

        blog: { title: "", summary: "" },

        contact: { message: "", email: "", phone: "" },
    };

    //  2. Context State
    const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
    const [allPortfolioData, setAllPortfolioData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    let [userId, setUserId] = useState(null);
    const [activeSection, setActiveSection] = useState("basic"); // controls which form is visible

    let [editMode, setEditMode] = useState("");
    let [selectedRecord, setSelectedRecord] = useState('');


    //references for input boxes to change focus
    const nameRef = useRef(null);
    const titleRef = useRef(null);
    const roleRef = useRef(null);
    const taglineRef = useRef(null);
    const locationRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);


    //  3. Function to update  section with simple object immutably
    const updateSectionData = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...newData,
            },
        }));
    };

    //adding slots for social
    const addSlotForSocial = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: { //about
                ...prev[section], //prev[about] bio:'',  location:''
                socials: [ ...prev[section]['socials'],  newData], //newData is of form {name:'',url:''}
            },
        }));
    };

    const removeSlotForSocial = (section, newData) => {
        console.log('new data=',newData);
        setPortfolioData(prev => ({
            ...prev,
            [section]: { //about
                ...prev[section], //prev[about]
                socials:    newData,
            },
        }));
    };


    const updateSectionDataForArrays = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                ...prev[section],
                ...newData,
            ],
        }));
    };

    const updateSectionDataForTestimonial = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                //...prev[section],
                ...newData,
            ],
        }));
    };

    const updateSectionDataForServices = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                //...prev[section],
                ...newData,
            ],
        }));
    };

    const updateSectionDataForSkills = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                //...prev[section],
                ...newData,
            ],
        }));
    };

    const updateSectionDataForProjects = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                //...prev[section],
                ...newData,
            ],
        }));
    };

    const removeSectionDataForArrays = (section, newData) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: [
                //...prev[section],
                ...newData,
            ],
        }));
    };

    //  4. Function to reset the entire portfolio (optional)
    const resetPortfolio = () => {
        setPortfolioData(initialPortfolioData);
    };

    //  5. Function to set template

    const setTemplate = (templateName) => {
        console.log(" in context , Setting template to:", templateName);
        setPortfolioData(prev => ({
            ...prev,
            template: templateName,
        }));
    };

    //  6. Function to send data to backend
    const submitPortfolio = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/add" ,portfolioData)



            console.log("Portfolio saved:", res.data);
            toast.success('form submitted');
            return res.data;

        } catch (err) {
            console.error(err);
        }
    };


//getting all records from database
    const getPortfolio = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/getAll" )

            console.log("Portfolio :", res.data);

            setAllPortfolioData(res.data);
            setFilteredData(res.data);
            return res.data;

        } catch (err) {
            console.error(err);
        }
    };

//delivering the state variables and functions
    return (
        <PortfolioContext.Provider
            value={{
                portfolioData,
                activeSection,
                setActiveSection,
                updateSectionData,
                resetPortfolio,
                setTemplate,
                submitPortfolio,
                updateSectionDataForArrays,
                removeSectionDataForArrays,
                updateSectionDataForServices,
                updateSectionDataForSkills,
                updateSectionDataForProjects,
                addSlotForSocial,
                removeSlotForSocial,
                updateSectionDataForTestimonial,
                getPortfolio,
                allPortfolioData,
                setAllPortfolioData,
                setPortfolioData,
                userId,
                setUserId,
                filteredData,
                setFilteredData,
                editMode, setEditMode,
                setSelectedRecord,
                selectedRecord,
                initialPortfolioData,
                nameRef ,
                titleRef ,
                roleRef ,
                taglineRef ,
                locationRef ,
                emailRef,
                phoneRef,

            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};
