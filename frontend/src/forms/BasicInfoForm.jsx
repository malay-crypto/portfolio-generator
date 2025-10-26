import {useContext, useEffect, useRef} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";




const BasicInfoForm = () => {

    const { portfolioData, updateSectionData,
        nameRef ,
        titleRef ,
        roleRef ,
        taglineRef ,
        locationRef ,
        emailRef,
        phoneRef

    } = useContext(PortfolioContext);
    const basic = portfolioData.basic;



    const handleChange = (e) => {
        updateSectionData("basic", { [e.target.name]: e.target.value });
    };

   useEffect(() => {
       console.log('portfolio data in basic info form=',portfolioData);
   },[])





    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Basic Info</h2>

            {console.log('portfolio data inside return in basic info form=',portfolioData)}

            <input
                type="text"
                name="name"
                value={basic.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                ref={nameRef}
            />

            <input
                type="text"
                name="title"
                value={basic.title}
                onChange={handleChange}
                placeholder="Title (e.g. Web Developer)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                ref={titleRef}
            />

            <input
                type="text"
                name="role"
                value={basic.role}
                onChange={handleChange}
                placeholder="Role (e.g. Frontend, Designer)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                ref={roleRef}
            />



        </div>
    );
};

export default BasicInfoForm
