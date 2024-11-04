import { MdAdd } from "react-icons/md";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/ProfileInfo/NoteCard";
import AddEditNote from "./AddEditNote";
import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { ToastMessageContext } from "../../Context/ToastMessage";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
// import addData from "../../../public/add-file-svgrepo-com.svg";
// import noData from "../../../public/no-data-icon.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLodaing] = useState(false);

  const { showToastMessage } = useContext(ToastMessageContext);

  const navigate = useNavigate();

  const onclose = () => {
    setOpenAddEditModal({ type: "add", data: null, isShow: false });
  };

  // Get user INfo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllData = async () => {
    setLodaing(true);
    try {
      const response = await axiosInstance.get("/api/Notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      } else {
        console.log("not found");
      }
    } catch (error) {
      console.log("please try again", error);
    } finally {
      setLodaing(false);
    }
  };

  // send data to modelAddEdit Components
  const handleUpdateNotes = (notesData) => {
    setOpenAddEditModal({ type: "edit", data: notesData, isShow: true });
  };

  // Delete Notes
  const deleteNotes = async (data) => {
    const notedId = data._id;
    try {
      const response = await axiosInstance.delete(`/api/Notes/${notedId}`);
      if (response.data && response.data.note) {
        setAllNotes((prevItems) =>
          prevItems.filter((item) => item._id !== notedId)
        );
        showToastMessage("note deleted Successfully  ", "delete");
      }
    } catch (error) {
      if (
        error.response.error &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("");
      }
    }
  };

  const updatePinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.patch(`/api/Notes/${noteId}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        getAllData();
        onclose();
        showToastMessage("Note pinned Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/api/Notes/search", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelClearSearch = () => {
    setIsSearch(false);
    getAllData();
  };

  useEffect(() => {
    getAllData();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handelClearSearch={handelClearSearch}
      />

      <div className="">
        {loading ? (
          <div className=" fixed h-screen w-screen  flex justify-center items-center" >
            <img src="/Spinner@1x-1.0s-200px-200px.svg" className="w-40" />
          </div>
        ) : allNotes && allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-4 mb-36 px-10">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                data={
                  item.createdOn
                    ? moment(item.createdOn).format("Do MMM YYYY")
                    : "No date"
                }
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleUpdateNotes(item);
                }}
                onDelete={() => deleteNotes(item)}
                onPinNote={() => updatePinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch ? "/no-data-icon.svg" : "/add-file-svgrepo-com.svg"
            }
            message={
              isSearch
                ? `Oops! No notes found matching your search`
                : `Start Creating first note! click the 'Add' button to jot down your thoughts , ideas , and reminders. let's get started!`
            }
          />
        )}

        <Button
          className="btn-primary w-16 h-16 flex items-center justify-center rounded-2xl fixed right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShow: true, data: null, type: "add" });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </Button>

        <Modal
          isOpen={openAddEditModal.isShow}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[80%] sm:w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
        >
          <AddEditNote
            onclose={onclose}
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
            setAllNotes={setAllNotes}
          />
        </Modal>

        <ToastMessage />
      </div>
    </>
  );
};

export default Home;
