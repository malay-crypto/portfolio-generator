import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import {useContext, useRef} from "react";

let HeroForm = ()=>{

    const { portfolioData,
        updateSectionData,
        nameRef ,
        titleRef ,
        roleRef ,
        taglineRef ,
        locationRef ,
        emailRef,
        phoneRef} = useContext(PortfolioContext);
    const hero = portfolioData.hero;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateSectionData("hero", { [name]: value });
    };




    return (


        <>

            <div className="bg-white shadow-md rounded-2xl p-6 max-w-xl mx-auto mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hero Section</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="tagline"
                        value={hero.tagline}
                        onChange={handleChange}
                        placeholder="Enter your tagline"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                        ref={taglineRef}
                    />

                    <input
                        type="text"
                        name="profileImage"
                        value={hero.profileImage}
                        onChange={handleChange}
                        placeholder="Profile Image URL"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="text"
                        name="backgroundImage"
                        value={hero.backgroundImage}
                        onChange={handleChange}
                        placeholder="Background Image URL"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

        </>



    )






}
export default HeroForm