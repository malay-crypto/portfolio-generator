import {PortfolioContext} from "../context/PortfolioProvider.jsx";
import {useContext} from "react";

let SkillsForm=()=>{


    const { portfolioData, updateSectionData,
        updateSectionDataForArrays,removeSectionDataForArrays,
        updateSectionDataForSkills} = useContext(PortfolioContext);


    const skills = portfolioData.skills;



    console.log(portfolioData);

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index].name = value;
        updateSectionDataForSkills("skills", updatedSkills);
        console.log('update skills');
    };

    const addSkill = () => {
        updateSectionDataForArrays("skills", [ { name: "" }]);
    };

    const removeSkill = (index) => {
        console.log('index=',index);
        const updatedSkills = skills.filter((_, i) => i !== index);
        removeSectionDataForArrays("skills", updatedSkills);
    };



    return (


        <>

            <div className="bg-white shadow-md rounded-2xl p-6 max-w-xl mx-auto mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>

                <div className="space-y-3">
                    {skills.map((skill, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleSkillChange(i, e.target.value)}
                                placeholder="Skill name"
                                className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={() => removeSkill(i)}
                                className="text-red-500 hover:text-red-600 font-semibold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addSkill}
                        className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
                    >
                        + Add Skill
                    </button>
                </div>
            </div>


        </>



    )






}
export default SkillsForm