import React, { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WebStructureContext } from "./WebStructure";
import EditModal from "./EditModal/EditModal";
import { StructureContext } from "../../../App";

const CreateEl = ({ structure }) => {
  const str = useRef(null);
  const {
    isEditing,
    isEditingMovement,
    isSelected,
    setIsSelected,
    getParent,
    draggable,
  } = useContext(WebStructureContext);
  const { setCurrentStructure } = useContext(StructureContext);

  if (!structure) {
    return;
  }
  const movementCondition = () => {
    if (!isEditingMovement) {
      return false;
    }
    if (!structure["lay"]["position"]) {
      return false;
    }
    if (structure["lay"]["position"] === "static") {
      return false;
    }
    return true;
  };
  if (structure["type"] === "list") {
    return (
      <>
        <ul
          style={{ ...structure["sty"], ...structure["lay"] }}
          id={structure["id"]}
          ref={str}
          onMouseOver={() => {
            if (!movementCondition()) {
              return;
            }
            str.current.style.cursor = "move";
          }}
          onMouseOut={() => {
            str.current.style.cursor = "defaullt";
          }}
          onMouseDown={(e) => {
            if (!movementCondition()) {
              return;
            }

            draggable(e, str.current, structure);
          }}
          onMouseUp={() => {
            setStrPos((sP) => {
              sP.top = str.current.offsetTop;
              sP.left = str.current.offsetLeft;
              return { ...sP };
            });
          }}
          onDoubleClick={(e) => {
            if (isEditing) {
              if (e.target.id !== structure["id"]) {
                return;
              }
              setIsSelected((iS) => (iS !== structure ? structure : null));
              return;
            }
          }}
        >
          {structure["con"].map((item) => (
            <li key={uuidv4()}>{item}</li>
          ))}
        </ul>
        {isSelected === structure && isEditing ? (
          <EditModal
            paras={{ structure, id: structure["id"], type: structure["type"] }}
          />
        ) : (
          ""
        )}
      </>
    );
  }
  if (structure["type"] === "input") {
    return (
      <>
        <input
          type="text"
          style={{ ...structure["sty"], ...structure["lay"] }}
          id={structure["id"]}
          ref={str}
          onMouseOver={() => {
            if (!movementCondition()) {
              return;
            }
            str.current.style.cursor = "move";
          }}
          onMouseOut={() => {
            str.current.style.cursor = "defaullt";
          }}
          onMouseDown={(e) => {
            if (!movementCondition()) {
              return;
            }

            draggable(e, str.current, structure);
          }}
          onMouseUp={() => {
            setStrPos((sP) => {
              sP.top = str.current.offsetTop;
              sP.left = str.current.offsetLeft;
              return { ...sP };
            });
          }}
          onDoubleClick={(e) => {
            if (isEditing) {
              if (e.target.id !== structure["id"]) {
                return;
              }
              setIsSelected((iS) => (iS !== structure ? structure : null));
              return;
            }
          }}
        />
        {isSelected === structure && isEditing ? (
          <EditModal
            paras={{ structure, id: structure["id"], type: structure["type"] }}
          />
        ) : (
          ""
        )}
      </>
    );
  }
  if (structure["type"] === "button") {
    console.log(structure);
    return (
      <>
        <button
          style={{ ...{ ...structure["sty"] }, ...structure["lay"] }}
          ref={str}
          id={structure["id"]}
          onMouseOver={() => {
            if (!movementCondition()) {
              return;
            }
            str.current.style.cursor = "move";
          }}
          onMouseOut={() => {
            str.current.style.cursor = "defaullt";
          }}
          onMouseDown={(e) => {
            if (!movementCondition()) {
              return;
            }

            draggable(e, str.current, structure);
          }}
          onDoubleClick={(e) => {
            if (e.target.id !== structure["id"]) {
              return;
            }
            if (isEditing) {
              setIsSelected((iS) => (iS !== structure ? structure : null));
              return;
            }
          }}
        >
          {structure["txt"]}
        </button>
        {isSelected === structure && isEditing ? (
          <EditModal
            paras={{ structure, id: structure["id"], type: structure["type"] }}
          />
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
        id={structure["id"]}
        ref={str}
        onMouseOver={() => {
          if (!movementCondition()) {
            return;
          }

          str.current.style.cursor = "move";
        }}
        onMouseOut={() => {
          str.current.style.cursor = "defaullt";
        }}
        onMouseDown={(e) => {
          if (!movementCondition()) {
            return;
          }

          draggable(e, str.current, structure);
        }}
        onDoubleClick={(e) => {
          if (e.target.id !== structure["id"]) {
            return;
          }
          if (isEditing) {
            setIsSelected((iS) => (iS !== structure ? structure : null));
            return;
          }
        }}
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
        {structure["str"]
          ? Object.keys(structure["str"]).map((item) => (
              <CreateEl key={uuidv4()} structure={structure["str"][item]} />
            ))
          : ""}
      </div>
      {isSelected === structure && isEditing ? (
        <EditModal
          paras={{ structure, id: structure["id"], type: structure["type"] }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CreateEl;
