import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";

let TemplateSelect=()=>{


    const {
        setTemplate,
        setSelectedRecord,
        activeSection,
        setActiveSection,
        setPortfolioData
    } = useContext(PortfolioContext)

    let navigate=  useNavigate()

            let info=[

                {
                    templateName:'t1',
                    name:'Template-1',
                    image:'p1.jpg',
                    text:'Modern and clean design with stylish hero section with professional layout',
                    features:['yellow hero section','testimonial carousel'],
                    button_text:'customize this button'
                },

                {
                    templateName:'t2',
                    name:'Template-2',
                    image:'p2.jpg',
                    text:'Modern and clean design with elegant hero section with stylish layout',
                    features:['yellow hero section','testimonial carousel'],
                    button_text:'customize this button'
                }



            ];



// button for selecting template
            let buttonClick=(item)=>{

                    console.log('template info=',item);

                    setSelectedRecord('') //store the selected record to empty
                    setTemplate(item.templateName); //collect the template name


                    setActiveSection('basic'); //mark active section to basic

                    navigate('/sectionTab'); // go to section tab component
            }

            useEffect(() => {

                setSelectedRecord('') //set selected record to blank

            },[])



    return (


        <>
            <div className="jumbotron jumbotron-fluid w-screen h-screen flex justify-center items-center p-5 ">
                            <div  className="flex justify-center items-center gap-4">
                                {
                                    info.map((item,index)=>



                                        <div key={index}  className="max-w-sm rounded overflow-hidden shadow-lg pb-4 hover:translate-0.5">
                                            <div className={'relative'}>
                                                <img className="w-full " src={`/${item.image}`} alt="image1"/>
                                                <h3 className='absolute bottom-2 left-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-md'>{item.name}</h3>
                                            </div>
                                            <div className="px-6 py-4">
                                                <div className="font-semibold text-sm mb-2">{item.text}</div>
                                                <p className="text-gray-700 text-base">

                                                </p>
                                            </div>

                                                    <button onClick={()=>buttonClick(item)}  className="bg-red-500 rounded-full px-10 text-amber-50 text-sm py-1 m-1 cursor-pointer hover:bg-amber-400 hover:shadow-lg hover:translate-y-0.5">
                                                        Customise this template
                                                    </button>



                                        </div>


                                    )
                                }
                            </div>


            </div>

        </>


    )


}
export default TemplateSelect;