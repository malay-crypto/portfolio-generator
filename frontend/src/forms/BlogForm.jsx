import { useContext } from "react";
import {PortfolioContext} from "../context/PortfolioProvider.jsx";


const BlogForm = () => {
    const { portfolioData, updateSectionData } = useContext(PortfolioContext);
    const blog = portfolioData.blog;

    const handleChange = (field, value) => {
        const updated = {...blog};
        updated[field] = value;
        updateSectionData("blog", updated);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Blog</h2>


                <div

                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={blog.title}
                        onChange={(e) => handleChange( "title", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <textarea
                        placeholder="Summary"
                        value={blog.summary}
                        onChange={(e) => handleChange( "summary", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Blog Link"
                        value={blog.link}
                        onChange={(e) => handleChange( "link", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

        </div>
    );
};

export default BlogForm;
