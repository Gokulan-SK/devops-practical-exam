// src/context/PortfolioContext.jsx
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { v4 as uuidv4 } from "uuid"; // You'll need to install 'uuid': npm install uuid

// 1. Create the Context object
const PortfolioContext = createContext();

// 2. Custom hook for easy access
export const usePortfolio = () => {
  return useContext(PortfolioContext);
};

// 3. Provider Component
export const PortfolioProvider = ({ children }) => {
  // Use the custom hook to manage state and sync with localStorage
  const [projects, setProjects] = useLocalStorage(
    "student-portfolio-projects",
    []
  );

  // --- CRUD FUNCTIONS ---

  // CREATE: Adds a new project
  const addProject = (newProjectData) => {
    const newProject = {
      ...newProjectData,
      id: uuidv4(), // Generate a unique ID
      dateAdded: new Date().toISOString(), // Timestamp for sorting
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  // UPDATE: Edits an existing project
  const editProject = (id, updatedData) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, ...updatedData } : project
      )
    );
  };

  // DELETE: Removes a project
  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  // --- CONTEXT VALUE ---
  const value = {
    projects,
    addProject,
    editProject,
    deleteProject,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
