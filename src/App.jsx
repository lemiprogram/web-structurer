import { createContext, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Home from "./Components/Pages/Home";
import Layout from "./Components/Pages/Layout";
import Profile from "./Components/Pages/Profile";
import NotFound from "./Components/Pages/NotFound";
import Create from "./Components/Pages/Create";
import Templates from "./Components/Pages/Templates";
import Login from "./Components/Pages/Login";
import WebStructure from "./Components/Structures/webStructure/WebStructure";
import Projects from "./Components/Pages/Projects";
import allMyColors from "./allMyColors";
import allMyGridAreas from "./allMyGridAreas";

export const StructureContext = createContext();
export const structureTemplate = {
  id: uuidv4(),
  content: {
    header: null,
    nav: null,
    footer: null,
  },
  flexibleContent: [],
  styles: {
    colorScheme: allMyColors()[2],
    fontFamily: null,
    fontSize: null,
  },
};
!localStorage.getItem("myProjects")
  ? localStorage.setItem("myProjects", JSON.stringify({}))
  : "";
!localStorage.getItem("currentStructure")
  ? localStorage.setItem("currentStructure", JSON.stringify(structureTemplate))
  : "";

function App() {
  const [myProjects, setMyProjects] = useState(
    JSON.parse(localStorage.getItem("myProjects"))
  );
  const [currentStructure, setCurrentStructure] = useState(
    currentStructure["id"]
  );

  const appMsg = useRef(null);

  function showMsg(msg, type) {
    appMsg.current.classList.remove("hidden");
    appMsg.current.innerText = msg;
    if (type === "error") {
      appMsg.current.style.backgroundColor = "red";
    }
    if (type === "confirm") {
      appMsg.current.style.backgroundColor = "green";
    }
    setTimeout(() => appMsg.current.classList.add("hidden"), 6000);
  }
  return (
    <>
      <div
        className="fixed appMsg top-0 right-0 z-50 hidden capitalize"
        ref={appMsg}
      >

      </div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <StructureContext.Provider
                value={{
                  currentStructure,
                  setCurrentStructure,
                  myProjects,
                  setMyProjects,
                  showMsg,
                  structureTemplate
                }}
              >
                <Layout />
              </StructureContext.Provider>
            }
          >
            <Route index element={<Home />} />
            <Route
              path={"create"}
              element={currentStructure ? <WebStructure /> : <Create />}
            />
            <Route path={"projects"} element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
