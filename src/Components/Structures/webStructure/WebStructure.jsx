import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./WebStructure.css";
import { v4 as uuidv4 } from "uuid";
import { FaBars, FaEdit, FaGreaterThan, FaRegSave } from "react-icons/fa";
import { StructureContext } from "../../../App";
import EditNav from "./EditNav";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import allMyColors from "../../../allMyColors";
import setColorPalette from "../../../setColorPalette";
import Display from "./Display";
import { IoIosMove } from "react-icons/io";

export const WebStructureContext = createContext();
const MAX_WIDTH = 20;
const MAX_HEIGHT = 20;

function WebStructure() {
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMovement, setIsEditingMovement] = useState(false);
  const [showEditNav, setShowEditNav] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(true);
  const [isSelected, setIsSelected] = useState(null);
  const [editModal, setEditModal] = useState({
    top: 0,
    left: 0,
    section: "structures-section",
  });
  const {
    currentStructure,
    setCurrentStructure,
    myProjects,
    setMyProjects,
    showMsg,
  } = useContext(StructureContext);

  const editNav = useRef(null);
  const page = useRef(null);
  const headersSection = useRef(null);
  const saveInput = useRef(null)
  const saveModal = useRef(null)

  useEffect(() => renderCurrentStructure(), [currentStructure]);
  function renderCurrentStructure() {
    localStorage.setItem("currentStructure", JSON.stringify(currentStructure));
    setColorPalette(page.current, currentStructure.styles.colorScheme);
    if (!isEditing) {
      setIsSelected(() => null);
    }
  }

  const selections = {
    structures: {
      id: uuidv4(),
      content: {
        header: {
          id: uuidv4(),
          type: "header",
          str: {},
          sty: {
            backgroundColor: "var(--bg-200)",
            width: "100%  ",
            height: "minContent",
            padding: "20px",
          },
          lay: {
            position:"absolute",
            display: "flex",
            justifyContent: "spaceBetween",
            alignItems: "center",
          },
          txt: "Header",
        },
        nav: {
          id: uuidv4(),
          type: "nav",
          str: {},
          sty: {
            backgroundColor: "var(--bg-300)",
            width: "90%",
            height: "minContent",
            borderRadius: "20px",
            paddingInline: "20px",
            paddingBlock: "10px",
          },
          lay: {
            display: "flex",
            justifyContent: "spaceBetween",
            alignItems: "center",
            alignSelf: "center",
          },
          txt: "Nav",
        },
        footer: {
          id: uuidv4(),
          type: "footer",
          str: {},
          sty: { backgroundColor: "var(--bg-200)" },
          lay: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            padding: "0px",
            justifySelf: "end",
          },
          txt: "Footer",
        },
      },
      flexibleContent: {
        block: {
          id: uuidv4(),
          type: "block",
          str: {},
          sty: { backgroundColor: "inherit", width: "100px", height: "100px" },
          lay: {
            position:"absolute",
            top:"50px",
            left:"50px",
            display: "block",
            justifyContent: "center",
            alignItems: "center",
          },
          txt: "block",
        },
        input: {
          id: uuidv4(),
          type: "input",
          sty: {
            backgroundColor: "var(--bg-200)",
            borderRadius: "20px",
            paddingInline: "10px",
            paddingBlock: "5px",
            borderRadius:"20px",
            width: "300px",
          },
          lay: {
            position:"absolute",
            top:"50px",
            left:"50px",
          },
        },
        button: {
          id: uuidv4(),
          type: "button",
          sty: { backgroundColor: "var(--primary-100)",paddingInline:"20px",paddingBlock:"5px" },
          lay: {
            position:"absolute",
            top:"50px",
            left:"50px",
            display: "inline",
            justifyContent: "start",
            alignItems: "center",
          },
          txt: "button",
        },
        list: {
          id: uuidv4(),
          type: "list",
          sty: {
            backgroundColor: "inherit",
            textIndent: "20px",
            color: "inherit",
            padding:"10px",
          },
          lay: {
            position:"absolute",
            top:"50px",
            left:"50px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          },
          con: ["item1", "item2", "item3"],
        },
      },
      isOpen: false,
    },
    styles: {
      id: uuidv4(),
      content: {
        colors: allMyColors(),
      },
      isOpen: false,
    },
  };
  function saveCurrentStructure() {
    if(myProjects[currentStructure["id"]]){
      return setMyProjects(mP=>{
        showMsg(`${currentStructure["id"]} is already Saved`, "confirm")
        mP[currentStructure["id"]] = currentStructure
        return {...mP}
      })
    }
    saveModal.current.classList.remove("hide")
    
  }
  function getParent(child, parent, arr = [], item = "id") {
    console.log(child);
    console.log(parent);
    const max_len = arr.length - 1;
    if (child["parent"]) {
      console.log(child);
      arr.push(child["parent"][item]);

      console.log(parent);
      return getParent(child["parent"], parent, arr);
    }
    if (parent["content"] || parent["flexibleContent"]) {
      parent = parent["content"][child["type" /* type */]]
        ? parent["content"][child["type" /* type */]]
        : parent["flexibleContent"][child["id" /* id */]]
        ? parent["flexibleContent"][child["id" /* id */]]
        : parent;
    }
    if (arr.length) {
      console.log(child);
      console.log(parent);
      return getParent(
        child,
        parent["str"][arr[max_len]],
        arr.splice(0, max_len)
      );
    }
    console.log(parent);
    return parent;
  }
  const showFullScreenFunc = (fS) => {
    if (!editNav.current) {
      return;
    }
    const mainNav = document.querySelector("#main-nav");
    if (fS) {
      editNav.current.style.transition = "1s";
      editNav.current.style.width = "auto";
      editNav.current.style.opacity = "100%";
      mainNav.style.transition = "1s";
      mainNav.style.display = "flex";
      mainNav.style.opacity = "100%";
      return;
    }
    mainNav.style.display = "none";
    mainNav.style.transition = ".3s";
    mainNav.style.opacity = "0%";
    editNav.current.style.transition = ".3s";
    editNav.current.style.opacity = "0%";

    setTimeout(() => (editNav.current.style.width = "0px"), 50);
  };
  const showEditNavFunc = (sE) => {
    if (!editNav.current) {
      return;
    }
    if (sE) {
      editNav.current.style.transition = "1s";
      editNav.current.style.width = "auto";
      editNav.current.style.opacity = "100%";
      return;
    }
    editNav.current.style.transition = ".3s";
    editNav.current.style.opacity = "0%";

    setTimeout(() => (editNav.current.style.width = "0px"), 50);
  };
  function draggable(event, modal, structure = null, isEditModal = false) {
    event.preventDefault();
    //get the postion of the sticky note
    const posLeft = modal.offsetLeft;
    const posTop = modal.offsetTop;
    //get the postion of the mouse when mousedown
    const startX = event.pageX;
    const startY = event.pageY;
    //drag function changes the x and y positon of the sticky note based on the postion of the mouse
    const drag = (event) => {
      modal.style.left = `${posLeft + (event.pageX - startX)}px`;
      modal.style.top = `${posTop + (event.pageY - startY)}px`;
    };
    //mouseUp function removes the eventlisteners when the the mouse up
    const mouseUp = () => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", mouseUp);
      if (structure) {
        setCurrentStructure((cS) => {
          getParent(structure, cS)["lay"]["top"] = modal.offsetTop + "px";
          getParent(structure, cS)["lay"]["left"] = modal.offsetLeft + "px";
          return { ...cS };
        });
      }
      if (isEditModal) {
        setEditModal((eM) => {
          eM.top = modal.offsetTop;
          eM.left = modal.offsetLeft;
          return eM;
        });
      }
    };
    document.addEventListener("mousemove", drag); //calls the drag func when the mouse moves
    document.addEventListener("mouseup", mouseUp); // calls the mouseUp func when the mouse is no longer being pressed
  }

  return (
    <>
      <WebStructureContext.Provider
        value={{
          selections,
          page,
          editNav,
          headersSection,
          isEditing,
          isEditingMovement,
          isSelected,
          setIsSelected,
          editModal,
          setEditModal,
          getParent,
          draggable,
        }}
      >
        <div className="flex page">
          <EditNav />

          <div
            className="page  relative"
            ref={page}
            style={{
              position: "relative",
            }}
          >
            <div className="edit-btns  flex fixed bottom-0 right-0 items-center bg-[var(--text-100)] w-[400px] px-5 justify-evenly rounded-full">
              <div
                className="edit-btn "
                onClick={() =>
                  setShowEditNav((sE) => {
                    showEditNavFunc(!sE);
                    return !sE;
                  })
                }
              >
                <FaBars size="23px" />
              </div>
              <div
                className="edit-btn "
                onClick={() => {
                  setIsEditing((iE) => false);
                  setIsEditingMovement((eM) => !eM);
                }}
              >
                <IoIosMove size="23px" />
              </div>
              <div
                className="edit-btn "
                onClick={() => {
                  setIsEditing((iE) => !iE);
                  setIsEditingMovement((eM) => false);
                }}
              >
                <FaEdit size="23px" />
              </div>
              <div
                className="edit-btn "
                onClick={() => {
                  saveCurrentStructure();
                }}
              >
                <FaRegSave size="23px" />
                <div className="modal-body hide text-white"
                  ref={saveModal}
                  onClick={(e)=>{
                    if(e.target === saveModal.current){
                      saveModal.current.classList.add("hide")
                    }
                  }}
                  >
                  <div className="modal">
                    <div className="heading">
                      Save this current structure as
                    </div>
                    <div className="inp flex gap-2">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="rounded-full outline-none bg-inherit border-[var(--text-100)]"
                        ref={saveInput}
                      />
                    </div>
                    <div 
                    className="save-btn bg-[var(--primary-100)] px-5 py-1 rounded-full"
                    onClick={()=>{
                        const val = saveInput.current.value
                        if(!val){
                          return showMsg("please input a value","error")

                        }

                      setCurrentStructure(cS=>{
                        if(myProjects[val]){
                          showMsg("That project already exists","error")
                          return {...cS}
                        }
                        cS["id"] = val
                        myProjects[val] = cS
                        saveModal.current.classList.add("hide")
                        
                        showMsg(`${val} is Saved`,"confirm")
                        return {...cS}
                        
                      })
                    }}>save</div>
                  </div>
                </div>
              </div>
              <div
                className="edit-btn"
                onClick={() =>
                  setShowFullScreen((fS) => {
                    showFullScreenFunc(!fS);
                    return !fS;
                  })
                }
              >
                {showFullScreen ? (
                  <MdFullscreen size="30px" />
                ) : (
                  <MdFullscreenExit size="30px" />
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="fixed top-2 right-2 bg-[var(--text-100)] text-[var(--bg-100)] px-4 cursor-default py-2 rounded-full opacity-80 z-50">
                Edit Mode
              </div>
            ) : isEditingMovement ? (
              <div className="fixed top-2 right-2 bg-[var(--text-100)] text-[var(--bg-100)] px-4 cursor-default py-2 rounded-full opacity-80 z-50">
                Restructure Mode
              </div>
            ) : (
              ""
            )}
            <Display />
          </div>
        </div>
      </WebStructureContext.Provider>
    </>
  );
}

export default WebStructure;
