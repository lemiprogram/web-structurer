import React, { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WebStructureContext } from "./WebStructure";
import EditModal from "./EditModal/EditModal";

const CreateEl = ({ structure }) => {
  const str = useRef(null);
  const { isEditing, isSelected, setIsSelected } =
    useContext(WebStructureContext);
  if (!structure) {
    return;
  }
  if (structure["type"] === "input") {
    return (
      <>
        <input
          type="text"
          style={{ ...structure["sty"], ...structure["lay"] }}
          ref={str}
          onClick={(e) => {
            if (isEditing) {
              setIsSelected((iS) => (iS !== structure ? structure : null));
              return;
            }
          }}
        />
        {isSelected === structure ? (
          <EditModal paras={{ structure, type: structure["type"] }} />
        ) : (
          ""
        )}
      </>
    );
  }
  if (structure["type"] === "button") {
    return (
      <>
        <button
          style={{ ...structure["sty"], ...structure["lay"] }}
          ref={str}
          onClick={(e) => {
            if (isEditing) {
              setIsSelected((iS) => (iS !== structure ? structure : null));
              return;
            }
          }}
        ></button>
        {isSelected === structure ? (
          <EditModal paras={{ structure, type: structure["type"] }} />
        ) : (
          ""
        )}
      </>
    );
  }
  return (
    <>
      <div
        style={{ ...structure["sty"], ...structure["lay"] }}
        ref={str}
        onClick={(e) => {
          if (isEditing) {
            setIsSelected((iS) => (iS !== structure ? structure : null));
            return;
          }
        }}
        id={structure.id}
      >
        {structure["con"] && structure["type"] !== "list" ? (
          <div>{structure["txt"]}</div>
        ) : (
          " "
        )}
        {structure["txt"] && structure["type"] !== "button" ? (
          <div>{structure["txt"]}</div>
        ) : (
          ""
        )}
        {structure["type"] === "button" ? (
          <button>{structure["txt"]}</button>
        ) : (
          ""
        )}
        {structure["type"] === "list" ? (
          <ul>
            {structure["con"].map((item) => (
              <li key={uuidv4()}>{item}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
        {structure["str"]
          ? structure["str"].map((item) => (
              <CreateEl key={uuidv4()} structure={item["str"]} />
            ))
          : ""}
      </div>
      {isSelected === structure ? (
        <EditModal paras={{ structure, type: structure["type"] }} />
      ) : (
        ""
      )}
    </>
  );
};

export default CreateEl;
