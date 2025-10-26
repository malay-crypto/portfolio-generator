import {useContext, useState} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


const ServicesForm = () => {
    const { portfolioData, updateSectionData,
        updateSectionDataForArrays,updateSectionDataForServices,activeSection } = useContext(PortfolioContext);
    const services = portfolioData.services;



    const handleChange = (index, field, value) => {
        const updated = [...services];
        updated[index][field] = value;
        updateSectionDataForServices(activeSection,updated);
    };





    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Services</h2>

            {services.map((service, i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Service Title"
                        value={service.title}
                        onChange={(e) => handleChange(i, "title", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <textarea
                        placeholder="Service Description"
                        value={service.description}
                        onChange={(e) => handleChange(i, "description", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    ></textarea>
                </div>
            ))}


        </div>
    );
};

export default ServicesForm;
