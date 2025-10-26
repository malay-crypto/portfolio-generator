import { useContext } from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


const TestimonialsForm = () => {
    const { portfolioData, updateSectionData,
        updateSectionDataForArrays,updateSectionDataForTestimonial } = useContext(PortfolioContext);
    const testimonials = portfolioData.testimonials;

    const handleChange = (index, field, value) => {
        const updated = [...testimonials]; //total testimonial array
        updated[index][field] = value; //storing in that index of array
        updateSectionDataForTestimonial("testimonials", updated); //sending total array
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Testimonials</h2>

            {testimonials.map((testi, i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={testi.clientName}
                        onChange={(e) => handleChange(i, "clientName", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <textarea
                        placeholder="Quote"
                        value={testi.quote}
                        onChange={(e) => handleChange(i, "quote", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    ></textarea>
                </div>
            ))}
        </div>
    );
};

export default TestimonialsForm;
