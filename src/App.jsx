import { createContext, useState } from "react";
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
!localStorage.getItem("myStructures")
  ? localStorage.setItem("myStructures", JSON.stringify([]))
  : "";
!localStorage.getItem("currentStructure")
  ? localStorage.setItem("currentStructure", JSON.stringify(structureTemplate))
  : "";

function App() {
  const [myStructures, setMyStructures] = useState(
    JSON.parse(localStorage.getItem("myStructures"))
  );
  const [currentStructure, setCurrentStructure] = useState(
    JSON.parse(localStorage.getItem("currentStructure"))
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <StructureContext.Provider
                value={{ currentStructure, setCurrentStructure , myStructures, setMyStructures}}
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
