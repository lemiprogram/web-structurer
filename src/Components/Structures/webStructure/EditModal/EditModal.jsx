import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import "./EditModal.css";
import { v4 as uuidv4 } from "uuid";
import allMyStyles from "../../../../allMyStyles";
import draggable from "../../../../draggable";
import allMyLayouts from "../../../../allMyLayouts";
import { StructureContext } from "../../../../App";
import { WebStructureContext } from "../WebStructure";
import { FaEdit } from "react-icons/fa";

function EditModal({ paras }) {
  const { currentStructure, setCurrentStructure } =
    useContext(StructureContext);
  const { editModal, setEditModal, setIsSelected } =
    useContext(WebStructureContext);

  const addStructure = useRef(null);
  const addStyle = useRef(null);
  const addLayout = useRef(null);
  const addFunction = useRef(null);
  const editingModal = useRef(null);
  const { structure, type } = paras;
  if (!structure) {
    return console.error("No Structure");
  }
  const toggleEditModal = (id) => {
    document
      .querySelectorAll(".editModalBtn")
      .forEach((item) => item.classList.remove("editModalBtnActive"));
    setEditModal((eM) => {
      eM["section"] = id;
      return { ...eM };
    });
    document.querySelector("#" + id).classList.add("editModalBtnActive");
  };
  const showModal = (modal) => {
    modal.classList.remove("hide");
  };
  const closeModal = (modal) => {
    modal.classList.add("hide");
  };

  const addToCurrentStructure = (modal, entry) => {
    const key = modal.querySelector("select").value;
    const val = modal.querySelector("input").value;
    setCurrentStructure((cS) => {
      cS.content[type][entry][key] = val;
      return { ...cS };
    });
    closeModal(modal);
  };
  const addStructureToCurrentStructure = (modal, entry) => {};
  return (
    <>
      <div
        className="editingModal absolute top-0 left-100 flex flex-col p-5 "
        ref={editingModal}
      >
        <div
          className="editModalBtns flex jusfity-start"
          onMouseDown={(e) => draggable(e, editingModal.current)}
        >
          <div
            className="structures-section-btn capitalize editModalBtnActive editModalBtn"
            onClick={(e) => toggleEditModal(e.target.id)}
            id="structures-section"
          >
            structures
          </div>
          <div
            className="styles-section-btn capitalize  editModalBtn "
            onClick={(e) => toggleEditModal(e.target.id)}
            id="styles-section"
          >
            styles
          </div>
          <div
            className="layouts-section-btn capitalize  editModalBtn "
            id="layouts-section"
            onClick={(e) => toggleEditModal(e.target.id)}
          >
            layouts
          </div>
        </div>
        {editModal["section"] === "structures-section" ? (
          <div className="editModal-section  structures-section editModalActive-section bg-red-600 ">
            <div className="sub-heading">Add, Edit and Remove Structures</div>
            <div className="current my-5">
              <div className="editModal-item">
                <div className="item flex justify-start w-full gap-2">
                  <div className="sub-heading">This structure: </div>
                  <div className="key capitalize">{type}</div>
                </div>
                <div className="btns">
                  <div
                    className="delete-btn btn"
                    onClick={() => {
                      setCurrentStructure((cS) => {
                        if (cS["content"][type]) {
                          cS["content"][type] = null;
                        }
                        if (cS["flexibleContent"][type]) {
                          cS["flexibleContent"][type] = cS["flexibleContent"][
                            type
                          ].filter((item) => item !== structure["id"]);
                        }
                        return { ...cS };
                      });
                      setIsSelected(() => null);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            </div>
            {structure["txt"] ? (
              <div className="inp">
                <label>Inner Text:</label>
                <input
                  type="text"
                  className="bg-inherit text-center"
                  defaultValue={structure["txt"]}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCurrentStructure((cS) => {
                        cS.content[type]["txt"] = e.target.value;
                        return { ...cS };
                      });
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {structure["con"] ? (
              <div className="inp">
                <label>Contents :</label>
                <input
                  type="text"
                  className="bg-inherit text-center"
                  defaultValue={structure["con"].join(",")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCurrentStructure((cS) => {
                        cS.content[type]["con"] = e.target.value.split(",");
                        return { ...cS };
                      });
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}

            {structure["str"] ? (
              <div className="editModal-items">
                <div className="sub-heading capitalize">inner structures</div>
                {structure["str"].map((str) => {
                  return (
                    <div key={uuidv4()} className="editModal-item">
                      <div className="item flex justify-between w-full gap-2">
                        <div className="key capitalize">{str["type"]}</div>
                      </div>
                      <div className="btns">
                        <div
                          className="edit-btn btn"
                          onClick={() => setIsSelected(() => str)}
                        >
                          <FaEdit />
                        </div>
                        <div
                          className="delete-btn btn"
                          onClick={() =>
                            setCurrentStructure((cS) => {
                              cS["flexibleContent"][str["type"]] = cS[
                                "flexibleContent"
                              ][str["type"]].filter(
                                (item) => item !== str["id"]
                              );

                              setIsSelected(() => null);
                              return { ...cS };
                            })
                          }
                        >
                          <MdDelete />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <div className="add-btnSection flex justify-center">
              <div
                className="add-btn rounded-full"
                onClick={() => showModal(addStructure.current)}
              >
                Add Structures
              </div>
            </div>
            <div
              className="modal-body hide"
              ref={addStructure}
              onClick={(e) => {
                if (e.target === addStyle.current) {
                  closeModal(e.target);
                }
              }}
            >
              <div className="modal styles-modal ">
                <div className="inp">
                  <select name="" id="">
                    {allMyStyles().map((item) => (
                      <option
                        key={uuidv4()}
                        className="capitalize"
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <input type="text" />
                </div>
                <div
                  className="add-btn rounded-full"
                  onClick={() =>
                    addToCurrentStructure(addStructure.current, "sty")
                  }
                >
                  Add
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {editModal["section"] === "styles-section" ? (
          <div className="editModal-section  styles-section   bg-green-600">
            <div className="sub-heading">Add, Edit and Remove Styles</div>
            <div className="editModal-items">
              {Object.entries(structure["sty"]).map((item) => {
                const [key, val] = item;
                return (
                  <div key={uuidv4()} className="editModal-item">
                    <div className="item flex justify-between w-full gap-2">
                      <div className="key capitalize">{key}</div>
                      <input
                        type="text"
                        className="bg-inherit  text-center rounded-full w-[180px]"
                        placeholder={key}
                        onKeyDown={(e) =>
                          e.key === "Enter"
                            ? setCurrentStructure((cS) => {
                                if (cS.content[type]) {
                                  cS.content[type]["sty"][key] = e.target.value;
                                  return { ...cS };
                                }
                                cS.flexibleContent[type]["sty"][key] =
                                  e.target.value;
                                return { ...cS };
                              })
                            : ""
                        }
                        defaultValue={val}
                      />
                    </div>
                    <div className="btns">
                      <div
                        className="delete-btn btn"
                        onClick={() =>
                          setCurrentStructure((cS) => {
                            delete cS.content[type]["sty"][key];
                            return { ...cS };
                          })
                        }
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-btnSection flex justify-center">
              <div
                className="add-btn rounded-full"
                onClick={() => showModal(addStyle.current)}
              >
                Add Styles
              </div>
            </div>
            <div
              className="modal-body hide"
              ref={addStyle}
              onClick={(e) => {
                if (e.target === addStyle.current) {
                  closeModal(e.target);
                }
              }}
            >
              <div className="modal styles-modal ">
                <div className="inp">
                  <select name="" id="">
                    {allMyStyles().map((item) => (
                      <option key={uuidv4()} className="" value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input type="text" />
                </div>
                <div
                  className="add-btn rounded-full"
                  onClick={() => addToCurrentStructure(addStyle.current, "sty")}
                >
                  Add
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {editModal["section"] === "layouts-section" ? (
          <div className="editModal-section layouts-section  bg-blue-600">
            <div className="sub-heading">Add, Edit and Remove Layouts</div>
            <div className="editModal-items">
              {Object.entries(structure["lay"]).map((item) => {
                const [key, val] = item;
                return (
                  <div key={uuidv4()} className="editModal-item">
                    <div className="item flex justify-between w-full gap-2">
                      <div className="key capitalize">{key}</div>
                      <input
                        type="text"
                        className="bg-inherit capitalize text-center rounded-full w-[180px]"
                        placeholder={key}
                        onKeyDown={(e) =>
                          e.key === "Enter"
                            ? setCurrentStructure((cS) => {
                                cS.content[type]["lay"][key] = e.target.value;
                                return { ...cS };
                              })
                            : ""
                        }
                        defaultValue={val}
                      />
                    </div>
                    <div className="btns">
                      <div
                        className="delete-btn btn"
                        onClick={() =>
                          setCurrentStructure((cS) => {
                            delete cS.content[type]["lay"][key];
                            return { ...cS };
                          })
                        }
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-btnSection flex justify-center">
              <div
                className="add-btn rounded-full"
                onClick={() => showModal(addLayout.current)}
              >
                Add Layouts
              </div>
            </div>
            <div
              className="modal-body hide"
              ref={addLayout}
              onClick={(e) => {
                if (e.target === addLayout.current) {
                  closeModal(e.target);
                }
              }}
            >
              <div className="modal Layouts-modal ">
                <div className="inp">
                  <select name="" id="">
                    {allMyLayouts().map((item) => (
                      <option
                        key={uuidv4()}
                        className="capitalize"
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <input type="text" />
                </div>
                <div
                  className="add-btn rounded-full"
                  onClick={() =>
                    addToCurrentStructure(addLayout.current, "lay")
                  }
                >
                  Add
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default EditModal;
