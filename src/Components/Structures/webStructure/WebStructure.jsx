import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./WebStructure.css";
import { v4 as uuidv4 } from "uuid";
import { FaBars, FaEdit, FaGreaterThan } from "react-icons/fa";
import { StructureContext } from "../../../App";
import EditNav from "./EditNav";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import allMyColors from "../../../allMyColors";
import setColorPalette from "../../../setColorPalette";
import Display from "./Display";

export const WebStructureContext = createContext();
const MAX_WIDTH = 20;
const MAX_HEIGHT = 20;

function WebStructure() {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditNav, setShowEditNav] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(true);
  const [isSelected, setIsSelected] = useState(null);
  const [editModal, setEditModal] = useState({
    positionX: null,
    positionY: null,
    section: "structures-section",
  });
  const { currentStructure } = useContext(StructureContext);

  const editNav = useRef(null);
  const page = useRef(null);
  const headersSection = useRef(null);

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
          id: "headers-" + uuidv4(),
          type: "header",
          str: [],
          sty: {
            backgroundColor: "var(--bg-200)",
            width: "100vw",
            height: "minContent",
            padding: "20px",
          },
          lay: {
            display: "flex",
            justifyContent: "spaceBetween",
            alignItems: "center",
          },
          txt: "Header",
        },
        nav: {
          id: "navs" + uuidv4(),
          type: "nav",
          str: [],
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
          id: "navs" + uuidv4(),
          type: "footer",
          str: [],
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
          type: "block",
          str: [],
          sty: { backgroundColor: "inherit", width: "100px", height: "100px" },
          lay: {
            display: "block",
            justifyContent: "center",
            alignItems: "center",
          },
          txt: "block",
        },
        input: {
          type: "input",
          sty: {
            backgroundColor: "var(--bg-200)",
            borderRadius: "20px",
            paddingInline: "10px",
            paddingBlock: "5px",
            width:"300px",
          },
          lay: {},
        },
        button: {
          type: "button",
          str: [
            {
              type: "button",
              sty: { backgroundColor: "var(--primary-100)" },
              lay: {
                display: "inline",
                justifyContent: "start",
                alignItems: "center",
              },
              txt: "button",
            },
          ],
          sty: { backgroundColor: "inherit" },
          lay: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          },
        },
        list: {
          type: "list",
          str: [],
          sty: {
            backgroundColor: "inherit",
            textIndent: "20px",
            color: "inherit",
          },
          lay: {
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
  return (
    <>
      <WebStructureContext.Provider
        value={{
          selections,
          page,
          editNav,
          headersSection,
          isEditing,
          isSelected,
          setIsSelected,
          editModal,
          setEditModal,
        }}
      >
        <div className="flex page">
          <EditNav />

          <div
            className="page grid relative"
            ref={page}
            style={{
              display: "flex",
              flexDirection: "column",
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
                onClick={() => setIsEditing((iE) => !iE)}
              >
                <FaEdit size="23px" />
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
              <div className="fixed top-2 right-2 bg-[var(--text-100)] text-[var(--bg-100)] px-4 cursor-default py-2 rounded-full opacity-80">
                Edit Mode
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
