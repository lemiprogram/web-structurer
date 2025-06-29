import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import "./EditModal.css";
import { v4 as uuidv4 } from "uuid";
import allMyStyles from "../../../../allMyStyles";
import allMyStructs from "../../../../allMyStructs";
import allMyLayouts from "../../../../allMyLayouts";
import { StructureContext } from "../../../../App";
import { WebStructureContext } from "../WebStructure";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function EditModal({ paras }) {
  const { currentStructure, setCurrentStructure } =
    useContext(StructureContext);
  const { editModal, setEditModal, setIsSelected, selections, getParent , draggable} =
    useContext(WebStructureContext);

  const addStructure = useRef(null);
  const addStyle = useRef(null);
  const addLayout = useRef(null);
  const addFunction = useRef(null);
  const editingModal = useRef(null);
  const { structure, type, id } = paras;
  if (!structure) {
    return console.error("No Structure");
  }
  const toggleEditModal = (id) => {
    setEditModal((eM) => {
      eM["section"] = id;
      return { ...eM };
    });
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
      if (cS.content[type]) {
        cS.content[type][entry][key] = val;
      } else {
        cS["flexibleContent"] = cS["flexibleContent"].map((str) => {
          if (str === structure) {
            str[entry][key] = val;
          }
          return str;
        });
      }
      return { ...cS };
    });
    closeModal(modal);
  };
  const addStructureToCurrentStructure = (modal) => {
    const key = modal.querySelector("select").value;
    const selection = selections["structures"]["content"][key]
      ? selections["structures"]["content"][key]
      : selections["structures"]["flexibleContent"][key];
    selection.__proto__.parent = () => structure;
    setCurrentStructure((cS) => {
      getParent(structure, cS)["str"][selection["id"]] = selection;
      return { ...cS };
    });
    closeModal(modal);
  };

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
            style={
              editModal.section === "structures-section"
                ? {
                    backgroundColor: "var(--primary-200)",
                    color: "var(--bg-100)",
                  }
                : { backgroundColor: "var(--bg-200)", color: "var(--text-100)" }
            }
          >
            structures
          </div>
          <div
            className="styles-section-btn capitalize  editModalBtn "
            onClick={(e) => toggleEditModal(e.target.id)}
            id="styles-section"
            style={
              editModal.section === "styles-section"
                ? {
                    backgroundColor: "var(--primary-200)",
                    color: "var(--bg-100)",
                  }
                : { backgroundColor: "var(--bg-200)", color: "var(--text-100)" }
            }
          >
            styles
          </div>
          <div
            className="layouts-section-btn capitalize  editModalBtn "
            id="layouts-section"
            onClick={(e) => toggleEditModal(e.target.id)}
            style={
              editModal.section === "layouts-section"
                ? {
                    backgroundColor: "var(--primary-200)",
                    color: "var(--bg-100)",
                  }
                : { backgroundColor: "var(--bg-200)", color: "var(--text-100)" }
            }
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
                        delete getParent(structure, cS);

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
                        getParent(structure, cS)["txt"] = e.target.value;
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
                        getParent(structure, cS)["con"] =
                          e.target.value.split(",");

                        return { ...cS };
                      });
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}

            {structure["str"] /* edit modal -items */ ? (
              <div className="editModal-items">
                <div className="sub-heading capitalize">inner structures</div>
                {Object.keys(structure["str"]).map((struct) => (
                  <div key={uuidv4()} className="editModal-item">
                    <div className="item flex justify-between w-full gap-2">
                      <div className="key capitalize">
                        {structure["str"][struct]["type"]}
                      </div>
                    </div>
                    <div className="btns">
                      <div
                        className="edit-btn btn"
                        onClick={() =>
                          setIsSelected((iS) => {
                            /*edit function  */
                            return getParent(
                              structure["str"][struct],
                              currentStructure
                            );
                          })
                        }
                      >
                        <FaEdit />
                      </div>
                      <div
                        className="delete-btn btn"
                        onClick={() => {
                          setCurrentStructure((cS) => {
                            delete getParent(structure["str"][struct], cS)[
                              "str"
                            ][struct];

                            return { ...cS };
                          });
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {structure["parentStr"] ? (
              <div className="editModal-items">
                <div className="sub-heading capitalize">outer Structures</div>
                <div className="editModal-item">
                  <div className="item flex justify-between w-full gap-2">
                    <div className="key capitalize">
                      {structure["parentStr"]()["type"]}
                    </div>
                  </div>
                  <div className="btns">
                    <div
                      className="edit-btn btn"
                      onClick={() =>
                        setIsSelected(() => structure["parentStr"]())
                      }
                    >
                      <FaEdit />
                    </div>
                    <div
                      className="delete-btn btn"
                      onClick={() => {
                        setCurrentStructure((cS) => {
                          if (cS.content[type]) {
                            cS.content[type]["str"] = cS.content[type][
                              "str"
                            ].filter(
                              (item) => item !== structure["parentStr"](``)
                            );
                          } else {
                            cS["flexibleContent"] = cS["flexibleContent"].map(
                              (str) => {
                                if (str === structure) {
                                  str["str"] = str["str"].filter(
                                    (item) =>
                                      item !== structure["parentStr"](``)
                                  );
                                }
                                return str;
                              }
                            );
                          }

                          return { ...cS };
                        });
                      }}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="add-btnSection flex justify-center">
              {structure["str"] ? (
                <div
                  className="add-btn rounded-full"
                  onClick={() => showModal(addStructure.current)}
                >
                  Add Structures
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="modal-body hide"
              ref={addStructure}
              onClick={(e) => {
                if (e.target === addStructure.current) {
                  closeModal(e.target);
                }
              }}
            >
              <div className="modal styles-modal relative">
                <div
                  className="closeModalBtn absolute top-0 right-0 p-2 cursor-pointer"
                  onClick={() => closeModal(addStructure.current)}
                >
                  <RxCross2 size={"20px"} />
                </div>
                <div className="inp">
                  <select name="" id="">
                    {allMyStructs().map((item) => (
                      <option
                        key={uuidv4()}
                        className="capitalize"
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="add-btn rounded-full"
                  onClick={() =>
                    addStructureToCurrentStructure(addStructure.current)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addStructureToCurrentStructure(addStructure.current);
                    }
                  }}
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
                                getParent(structure, cS)["sty"][key] =
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
                            delete getParent(structure, cS)["sty"][key];
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
                <div
                  className="closeModalBtn absolute top-0 right-0 p-2 cursor-pointer"
                  onClick={() => closeModal(addStyle.current)}
                >
                  <RxCross2 size={"20px"} />
                </div>
                <div className="inp">
                  <select name="" id="">
                    {allMyStyles().map((item) => (
                      <option key={uuidv4()} className="" value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addToCurrentStructure(addStyle.current, "sty");
                      }
                    }}
                  />
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
                                getParent(structure, cS)["lay"][key] =
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
                            delete getParent(structure, cS)["lay"][key];
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
                <div
                  className="closeModalBtn absolute top-0 right-0 p-2 cursor-pointer"
                  onClick={() => closeModal(addLayout.current)}
                >
                  <RxCross2 size={"20px"} />
                </div>
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
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addToCurrentStructure(addLayout.current, "lay");
                      }
                    }}
                  />
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
