import { useContext } from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


const ProjectsForm = () => {
    const { portfolioData, updateSectionData ,updateSectionDataForArrays,
        updateSectionDataForProjects
                                    } = useContext(PortfolioContext);
    const projects = portfolioData.projects;

    const handleChange = (index, field, value) => {
        const updated = [...projects];
        updated[index][field] = value;
        updateSectionDataForProjects("projects", updated);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Projects</h2>

            {projects.map((proj, i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => handleChange(i, "title", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="file"
                        placeholder="Image URL"

                        onChange={(e) => handleChange(i, "image", e.target.files[0])}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={proj.description}
                        onChange={(e) => handleChange(i, "description", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Project Link"
                        value={proj.link}
                        onChange={(e) => handleChange(i, "link", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            ))}
        </div>
    );
};

export default ProjectsForm;
