import {use, useContext, useRef} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


const ContactForm = () => {
    const {
        portfolioData,
        updateSectionData,
        nameRef ,
        titleRef ,
        roleRef ,
        taglineRef ,
        locationRef ,
        emailRef,
        phoneRef} = useContext(PortfolioContext);
    const contact = portfolioData.contact;

    const handleChange = (e) => {
        updateSectionData("contact", { [e.target.name]: e.target.value });
    };




    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Contact Info</h2>

            <input
                type="text"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                ref={emailRef}
            />

            <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                ref={phoneRef}
            />

            <textarea
                name="message"
                value={contact.message}
                onChange={handleChange}
                placeholder="Your message or call-to-action text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
            ></textarea>
        </div>
    );
};

export default ContactForm;
