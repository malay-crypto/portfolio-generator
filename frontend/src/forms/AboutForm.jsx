import {useContext, useRef} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


let AboutForm = ()=>{




        const { portfolioData,
            updateSectionData,
            addSlotForSocial,
            removeSlotForSocial,
            activeSection,
            nameRef ,
            titleRef ,
            roleRef ,
            taglineRef ,
            locationRef ,
            emailRef,
            phoneRef
        } = useContext(PortfolioContext);

        const about = portfolioData.about;

        const handleChange = (e) => {
            const { name, value } = e.target;
            updateSectionData("about", { [name]: value });
        };

        const handleSocialChange = (index, key, value) => {
            const updatedSocials = [...about.socials]; //copy to local variable
            updatedSocials[index][key] = value; //store the value in that index of the social array
            updateSectionData("about", { socials: updatedSocials });
        };

        let addSocial = () => {
            addSlotForSocial('about',{name: '',url:''});

        }

        let removeSocial = (index) => {
            console.log('active section',activeSection);
            console.log('index=',index);
            let socialsTemp = [...about.socials]; //copy to local variable
            console.log('socials temp=',socialsTemp);
            socialsTemp=  socialsTemp.filter( (item,i)=>i!==index )
            console.log('socials temp after filter=',socialsTemp);
             removeSlotForSocial(activeSection,socialsTemp);
        }



        return (


        <>
            <div className="bg-white shadow-md rounded-2xl p-6 max-w-xl mx-auto mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Section</h2>

                <textarea
                    name="bio"
                    value={about.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio about yourself..."
                    rows="4"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 mb-3"
                ></textarea>

                <input
                    type="text"
                    name="location"
                    value={about.location}
                    onChange={handleChange}
                    placeholder="Your location"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 mb-3"
                    ref={locationRef}
                />

                <div className="space-y-3">
                    {about.socials.map((social, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                type="text"
                                name='name'
                                value={social.name}
                                onChange={(e) => handleSocialChange(i, "name", e.target.value)}
                                placeholder="Platform (e.g., LinkedIn)"
                                className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name='url'
                                value={social.url}
                                onChange={(e) => handleSocialChange(i, "url", e.target.value)}
                                placeholder="Profile URL"
                                className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={() => removeSocial(i)}
                                className="text-red-500 hover:text-red-600 font-semibold"
                            >
                                ✕
                            </button>

                        </div>
                    ))}

                    <button
                        onClick={addSocial}
                        className="mt-3 w-full  cursor-pointer bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                        + Add Social
                    </button>
                </div>
            </div>


        </>



    )






}
export default AboutForm