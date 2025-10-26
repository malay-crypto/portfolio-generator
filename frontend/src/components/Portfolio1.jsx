import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import {useContext, useEffect} from "react";


let Portfolio1=()=>{

    //random images used for portfolio image
    let images=['pr1.jpg','pr2.jpg','pr3.jpg','pr4.jpg'];
    let rnd=Math.floor(Math.random()*images.length);



    const {portfolioData,
        setPortfolioData,
        allPortfolioData,
        getPortfolio,userId
    } = useContext(PortfolioContext);






    useEffect(() => {
                    console.log('useEffect of portfolio--1');
                    console.log('id=',userId);


                   let fetchData=async () => {
                      let d= await getPortfolio()//fetching all array of records from database
                        console.log('d=',d)
                       let r=d.find(item => item._id === userId) //collecting info for that user only  on that id collected in profile list page
                       console.log('r=',r)
                       setPortfolioData(r)

                   }
                   fetchData()

    },[])

    useEffect(() => {

       // console.log('portfolio--1  data=',portfolioData);



            console.log('variables values=',basic, hero, about, skills, services, projects, testimonials, blog, contact)

    },[portfolioData])

    let { basic, hero, about, skills, services, projects, testimonials, blog, contact }     = portfolioData||{};




    return (


        <>

        {/*  ====================  starting of UI ===================  */}

            <div className="w-full min-h-screen bg-gray-50 text-gray-800">
                {/* Hero Section */}
                {hero?.tagline || hero?.profileImage ? (
                    <section
                        className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-indigo-600 to-blue-500 text-white"
                        style={{
                            backgroundImage: hero.backgroundImage ? `url(http://localhost:3000/uploads/${hero.backgroundImage})` : `url(http://localhost:3000/uploads/s5.jpg)`,
                            backgroundSize: "content",
                            backgroundPosition: "center",
                        }}
                    >
                        {hero.profileImage ? (
                            <img
                                src={`http://localhost:3000/uploads/${hero.profileImage}`}
                                alt={basic?.name || "Profile"}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                            />
                        )
                        :<img
                                src={`http://localhost:3000/uploads/${images[rnd]}`}
                                alt={basic?.name || "Profile"}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                            />
                        }
                        {basic?.name && <h1 className="text-4xl font-bold">{basic.name}</h1>}
                        {basic?.role && <p className="text-lg text-blue-100 mt-2">{basic.role}</p>}
                        {hero?.tagline && <p className="text-sm text-blue-200 mt-4">{hero.tagline}</p>}
                    </section>
                ) : null}

                {/* About Section */}
                {(about?.bio || about?.location || (about?.socials?.length > 0)) && (
                    <section className="max-w-4xl mx-auto py-16 px-6">
                        <h2 className="text-3xl font-semibold text-center mb-6">About Me</h2>
                        {about.bio && <p className="text-gray-700 text-center mb-4">{about.bio}</p>}
                        {about.location && (
                            <p className="text-center text-gray-500">📍 {about.location}</p>
                        )}
                        {about.socials?.length > 0 && (
                            <div className="flex justify-center gap-4 mt-6">
                                {about.socials.map((social, i) =>
                                    social?.url ? (
                                        <a
                                            key={i}
                                            href={social.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            {social.name || "Link"}
                                        </a>
                                    ) : null
                                )}
                            </div>
                        )}
                    </section>
                )}

                {/* Skills Section */}
                {skills?.length > 0 && (
                    <section className="bg-white py-16">
                        <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills.map((skill, i) =>
                                    skill.name ? (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                                        >
                  {skill.name}
                </span>
                                    ) : null
                            )}
                        </div>
                    </section>
                )}

                {/* Services Section */}
                {services?.some(s => s.title || s.description) && (
                    <section className="max-w-6xl mx-auto py-16 px-6 bg-gray-100">
                        <h2 className="text-3xl font-semibold text-center mb-8">Services</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {services.map((s, i) =>
                                s.title ? (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                        <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                                        <p className="text-gray-600">{s.description}</p>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {projects?.some(p => p.title || p.image || p.description) && (
                    <section className="py-16 bg-white">
                        <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
                            {projects.map((p, i) =>
                                p.title ? (
                                    <div key={i} className="rounded-xl shadow-lg overflow-hidden">
                                        {p.image ?
                                            <img src={`http://localhost:3000/uploads/${p.image}`} alt={p.title} className="w-full h-48 object-cover" />
                                            :
                                            <img src={`http://localhost:3000/uploads/s5.jpg`} alt={p.title} className="w-full h-48 object-cover" />
                                        }
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg">{p.title}</h3>
                                            <p className="text-gray-600 text-sm mt-2">{p.description}</p>
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </section>
                )}

                {/* Testimonials Section */}
                {testimonials?.some(t => t.clientName || t.quote) && (
                    <section className="py-16 bg-gray-50">
                        <h2 className="text-3xl font-semibold text-center mb-8">Testimonials</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {testimonials.map((t, i) =>
                                t.quote ? (
                                    <div key={i} className="bg-white p-6 rounded-xl shadow-md max-w-sm text-center">
                                        <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
                                        <h4 className="font-semibold text-blue-600">{t.clientName}</h4>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                {(contact?.email || contact?.phone || contact?.message) && (
                    <section className="py-16 bg-blue-600 text-white text-center">
                        <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
                        {contact.message && <p className="mb-4">{contact.message}</p>}
                        {contact.email && <p>📧 {contact.email}</p>}
                        {contact.phone && <p>📞 {contact.phone}</p>}
                    </section>
                )}
            </div>




            {/*    ================end==========*/}

        </>


    )



}

export default Portfolio1;