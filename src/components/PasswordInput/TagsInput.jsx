/* eslint-disable react/prop-types */

import { MdAdd, MdClose } from "react-icons/md";
import TextFild from "../TextFild/TextFild";
import { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const tagsRemove = tags.filter((tagname) => tagname !== tagToRemove);
    setTags(tagsRemove);
  };
  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
              >
                # {tag}
                <button
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                >
                  <MdClose />
                </button>
              </span>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <TextFild
          type="text"
          styleInput="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onkeydown={handleKeyDown}
        />
        <button
          className=" group w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagsInput;
