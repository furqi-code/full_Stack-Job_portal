import { useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogForm = ({ setshowForm }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const readTimeRef = useRef();
  const categoryRef = useRef();
  const imageUrlRef = useRef();
  const authorRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const date = dateRef.current.value;
    const readTime = readTimeRef.current.value;
    const category = categoryRef.current.value;
    const imageUrl = imageUrlRef.current.value;
    const author = authorRef.current.value;
    axios({
      method: "POST",
      url: "http://localhost:1111/account/myBlogs/addBlog",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
      data: {
        title,
        description,
        date,
        readTime,
        category,
        imageUrl,
        author,
      },
    })
      .then((res) => {
        console.error("blog added in db");
        toast.success("Finishing your Blog post");
        setTimeout(() => {
          setshowForm(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding blog in DB :", error);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-5 max-w-xl"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            ref={descriptionRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            rows={3}
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              ref={dateRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Read Time (min)</label>
            <input
              type="number"
              name="readTime"
              ref={readTimeRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              min={1}
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            ref={categoryRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            ref={imageUrlRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            type="text"
            name="author"
            ref={authorRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setshowForm(false)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg border-2 border-gray-300 hover:border-transparent hover:bg-gray-400 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-400 text-white rounded-lg border-2 border-blue-400 hover:border-transparent hover:bg-green-500 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-right"/>
    </>
  );
};

export default BlogForm;
