/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import TagsInput from "../../components/PasswordInput/TagsInput";
import TextFild from "../../components/TextFild/TextFild";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";
import { ToastMessageContext } from "../../Context/ToastMessage";

const AddEditNote = ({ onclose, noteData, type, setAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");
  const { showToastMessage } = useContext(ToastMessageContext);
  // ADD NOTE
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/Notes", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        setAllNotes((prevNotes) => [...prevNotes, response.data.note]);
        onclose();
        showToastMessage("Note Added Successfully");
      }
    } catch (error) {
      if (
        error.response.error &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("");
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/api/Notes/${noteId}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        setAllNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? response.data.note : note
          )
        );
        onclose();
        showToastMessage("Note Update Successfully")
      }
    } catch (error) {
      if (
        error.response.error &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please the Enter Title");
      return;
    }
    if (!content) {
      setError("Please the Enter content");
      return;
    }

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }

    setError("");
  };
  return (
    <div className=" relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50  z-50 "
        onClick={onclose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <TextFild
          type="text"
          styleInput="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          label="Title"
          styleLabel="input-label"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <textarea
          type="text"
          className=" text-sm text-slate-950 outline-none bg-slate-50 p-2 rounde-md"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="mt-3">
        <label htmlFor="" className="input-label">
          Tgas
        </label>
        <TagsInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <Button className="mt-5 p-3 w-full" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </Button>
    </div>
  );
};

export default AddEditNote;
