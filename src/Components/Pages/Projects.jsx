import React, { useContext, useState } from "react";
import { StructureContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { Input } from "postcss";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Projects() {
  const { myProjects, setMyProjects, showMsg, setCurrentStructure} = useContext(StructureContext);
  const [editName, setEditName] = useState(null);
  const navigate = useNavigate()
  const errorMsgFunc = (text) => {
    const errorMsg = document.querySelector(".errorMsg");
    errorMsg.classList.remove("hidden");
    setTimeout(() => errorMsg.classList.add("hidden"), 5000);
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div className="heading text-5xl mx-auto capitalize ">
          My projects
        </div>
        <div className="projects card flex flex-col p-5">
          {Object.keys(myProjects).length ? (
            Object.keys(myProjects).map((item) => (
              <div
                key={uuidv4()}
                className="project flex justify-between px-5 py-3 text-[var(--text-100)]"
              >
                <div className="text-[var(--text-100)] flex ">
                  {editName === myProjects[item].id ? (
                    <input
                      type="text"
                      className="rounded-full border-[var(--text-100)] outline-none px-4"
                      defaultValue={myProjects[item].id}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (!e.target.value) {
                            return (e.target.value = item.id);
                          }
                          setMyProjects((mP) => {
                            if (mP[e.target.value]) {
                              return;
                            }
                          });
                        }
                      }}
                    />
                  ) : (
                    <div 
                    className="project-name cursor-pointer"  
                    onClick={()=>{
                      setCurrentStructure(()=>myProjects[item])
                      navigate("/create")
                    }}
                    >{item}</div>
                  )}
                </div>
                <div className="project-btns flex gap-2">
                  <div
                    className="edit-btn btn"
                    onClick={() => setEditName(() => item)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className="delete-btn btn"
                    onClick={() => {
                      setMyProjects((mP) => {
                        delete mP[item];
                        return { ...mP };
                      });
                      setEditName(() => null);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-3xl text-[var(--text-200)] capitalize">
              No projects
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
