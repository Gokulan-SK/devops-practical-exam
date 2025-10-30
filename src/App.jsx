import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx'; 
import HomePage from './components/HomePage.jsx'; 
import AddProjectForm from './components/AddProjectForm.jsx'; 
import EditProjectForm from './components/EditProjectForm.jsx'; 
import useTheme from "./hooks/useTheme.js"; // Dark Mode Custom Feature #1

// --- DELETE THE ThemeProvider COMPONENT ---

function App() {
  // Call the useTheme hook FIRST. This runs the effect to set the body class.
  const { theme, toggleTheme } = useTheme(); // <--- CALL HOOK HERE
    
  // State for view management (false = dashboard, true = add form)
  const [isFormVisible, setIsFormVisible] = useState(false); 
  // State for Update (U): holds the project data being edited
  const [editingProject, setEditingProject] = useState(null); 
  
  // ... (handleCloseForm and handleEditStart functions remain the same)
  const handleCloseForm = () => {
      setIsFormVisible(false);
      setEditingProject(null);
  }

  const handleEditStart = (project) => {
      setEditingProject(project);
      setIsFormVisible(false);
  }

  // ... (content logic remains the same)
  let content;
  if (isFormVisible) {
      content = <AddProjectForm onClose={handleCloseForm} />;
  } else if (editingProject) {
      content = <EditProjectForm project={editingProject} onClose={handleCloseForm} />;
  } else {
      content = (
          <HomePage 
              onAddProjectClick={() => setIsFormVisible(true)}
              onEditStart={handleEditStart} 
          />
      );
  }

  return (
    // <ThemeProvider> is now removed!
    <>
      <Navbar /> 
      
      <main className="container">
        {content}
      </main>
    </>
    // </ThemeProvider> is now removed!
  );
}

export default App;