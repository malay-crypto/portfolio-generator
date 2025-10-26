import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioProvider.jsx";

let Portfolio2 = () => {

//random images
    let images=['pr1.jpg','pr2.jpg','pr3.jpg','pr4.jpg'];
let rnd=Math.floor(Math.random()*images.length);

    const { portfolioData, setPortfolioData, getPortfolio, userId } =
        useContext(PortfolioContext); //collect state variables from  context  provider

    let { basic, hero, about, skills, services, projects, testimonials, contact } =
    portfolioData || {};

    //collect the user data from database of the matching user id collected in profile list page
    useEffect(() => {
        console.log("useEffect of portfolio--1");
        let fetchData = async () => {
            let d = await getPortfolio(); //getting all array of records
            let r = d.find((item) => item._id === userId); // get the record of that user id
            setPortfolioData(r);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-sans">
            {/* HERO SECTION */}
            {hero?.tagline || hero?.profileImage ? (
                <section
                    className="relative flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 text-white overflow-hidden"
                    style={{
                        backgroundImage: hero.backgroundImage
                            ? `url(http://localhost:3000/uploads/${hero.backgroundImage})`
                            : `url(http://localhost:3000/uploads/s4.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                        {hero.profileImage.trim()!=="" ? (
                            <img
                                src={`http://localhost:3000/uploads/${hero.profileImage}`}
                                alt={basic?.name || "Profile"}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-4"
                            />
                        )
                        :
                            <img
                                src={`http://localhost:3000/uploads/${images[rnd]}`}
                                alt={basic?.name || "Profile"}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-4"
                            />
                        }
                        <h1 className="text-4xl font-bold tracking-tight">
                            {basic?.name || "Your Name"}
                        </h1>
                        <p className="text-lg text-blue-100 mt-1">{basic?.role}</p>
                        <p className="text-sm text-blue-200 mt-3">{hero?.tagline}</p>
                    </div>
                </section>
            ) : null}

            {/* ABOUT SECTION */}
            {(about?.bio || about?.location) && (
                <section className="max-w-4xl mx-auto py-20 px-6">
                    <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
                        About Me
                    </h2>
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
                        {about.bio && (
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                {about.bio}
                            </p>
                        )}
                        {about.location && (
                            <p className="text-gray-500 mb-3">📍 {about.location}</p>
                        )}
                        {about.socials?.length > 0 && (
                            <div className="flex justify-center gap-4 mt-4">
                                {about.socials.map((s, i) =>
                                    s?.url ? (
                                        <a
                                            key={i}
                                            href={s.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            {s.name || "Link"}
                                        </a>
                                    ) : null
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* SKILLS SECTION */}
            {skills?.length > 0 && (
                <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-20">
                    <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                        Skills
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {skills.map((s, i) =>
                                s.name ? (
                                    <span
                                        key={i}
                                        className="px-5 py-2 bg-gradient-to-r from-indigo-200 to-blue-200 text-indigo-800 rounded-full shadow-sm font-medium"
                                    >
                  {s.name}
                </span>
                                ) : null
                        )}
                    </div>
                </section>
            )}

            {/* SERVICES SECTION */}
            {services?.some((s) => s.title || s.description) && (
                <section className="py-20 bg-white">
                    <h2 className="text-3xl font-semibold text-center mb-10">Services</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                        {services.map((s, i) =>
                            s.title ? (
                                <div
                                    key={i}
                                    className="bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
                                >
                                    <h3 className="font-bold text-lg mb-2 text-indigo-600">
                                        {s.title}
                                    </h3>
                                    <p className="text-gray-600">{s.description}</p>
                                </div>
                            ) : null
                        )}
                    </div>
                </section>
            )}

            {/* PROJECTS SECTION */}
            {projects?.some((p) => p.title || p.image) && (
                <section className="py-20 bg-gray-50">
                    <h2 className="text-3xl font-semibold text-center mb-10">
                        Projects
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                        {projects.map((p, i) =>
                            p.title ? (
                                <div
                                    key={i}
                                    className="rounded-2xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 transition"
                                >
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-52 object-cover"
                                        />
                                    )
                                    :
                                        <img
                                            src={`http://localhost:3000/uploads/s5.jpg`}
                                            alt={p.title}
                                            className="w-full h-52 object-cover"
                                        />
                                    }
                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg text-indigo-600">
                                            {p.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2 text-sm">
                                            {p.description}
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </section>
            )}

            {/* TESTIMONIALS */}
            {testimonials?.some((t) => t.clientName || t.quote) && (
                <section className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        Testimonials
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {testimonials.map((t, i) =>
                            t.quote ? (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center border border-indigo-100"
                                >
                                    <p className="italic text-gray-700 mb-4 leading-relaxed">
                                        “{t.quote}”
                                    </p>
                                    <h4 className="font-semibold text-indigo-600">
                                        {t.clientName}
                                    </h4>
                                </div>
                            ) : null
                        )}
                    </div>
                </section>
            )}

            {/* CONTACT SECTION */}
            {(contact?.email || contact?.phone) && (
                <section className="py-20 bg-indigo-700 text-white text-center">
                    <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
                    {contact.message && (
                        <p className="text-blue-100 mb-4">{contact.message}</p>
                    )}
                    {contact.email && <p className="mb-1">📧 {contact.email}</p>}
                    {contact.phone && <p>📞 {contact.phone}</p>}
                </section>
            )}
        </div>
    );
};

export default Portfolio2;
