


import MenuBar from "./components/MenuBar.jsx";
import TemplateSelect from "./components/TemplateSelect.jsx";
import {Routes,Route} from "react-router-dom";
import SectionTabs from "./components/SectionTabs.jsx";

import PortfolioList from "./components/PortfolioList.jsx";
import Portfolio1 from "./components/Portfolio1.jsx";
import Portfolio2 from "./components/Portfolio2.jsx";



/*

 <Route path="/basic" element={<BasicInfoForm/>} />
            <Route path="/about" element={<AboutForm/>} />
            <Route path="/hero" element={<HeroForm/>} />
            <Route path="/blog" element={<BlogForm/>} />
            <Route path="/contact" element={<ContactForm/>} />
            <Route path="/projects" element={<ProjectsForm/>} />
            <Route path="/services" element={<ServicesForm/>} />
            <Route path="/skills" element={<SkillsForm/>} />
            <Route path="/testimonials" element={<TestimonialsForm/>} />

 */


function App() {



   // console.log('app runs')

  return (
    <>

        <MenuBar/>

        {/* ====routes ========*/}
        <Routes>
            <Route path="/" element={<TemplateSelect/>} />
            <Route path="/sectionTab" element={<SectionTabs/>} />
            <Route path="/portfolioList" element={<PortfolioList/>} />
            <Route path="/portfolio1" element={<Portfolio1/>} />
            <Route path="/portfolio2" element={<Portfolio2/>} />

        </Routes>


    </>
  )
}

export default App
