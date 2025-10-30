// src/components/EditProjectForm.jsx

import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx'; 

const EditProjectForm = ({ project, onClose }) => {
  const { editProject } = usePortfolio();
  
  // Convert techStack array back into a comma-separated string for the form field
  const initialTechStack = project.projectDetails.techStack.join(', ');

  const [formData, setFormData] = useState({
    studentName: project.studentName,
    title: project.title,
    projectDetails: {
      techStack: initialTechStack, 
      description: project.projectDetails.description,
      githubLink: project.projectDetails.githubLink,
    },
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'techStack' || name === 'description' || name === 'githubLink') {
      setFormData(prev => ({
        ...prev,
        projectDetails: {
          ...prev.projectDetails,
          [name]: value,
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.studentName || !formData.projectDetails.description) {
        setError("Please fill in all mandatory fields.");
        return;
    }

    // Process techStack string back into an array
    const techStackArray = formData.projectDetails.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    const projectToUpdate = {
      // NOTE: We don't change the ID or dateAdded here
      studentName: formData.studentName,
      title: formData.title,
      projectDetails: {
        ...formData.projectDetails,
        techStack: techStackArray, // Updated array
      }
    };

    // Call the context function with the existing project ID
    editProject(project.id, projectToUpdate);
    onClose(); // Close the edit form
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.heading}>Edit Project: {project.title}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Input Fields (same structure as Add Form) */}
        <label style={styles.label}>Student Name</label>
        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} style={styles.input} required />
        
        <label style={styles.label}>Project Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Description</label>
        <textarea name="description" value={formData.projectDetails.description} onChange={handleChange} style={{ ...styles.input, ...styles.textarea }} required />

        <label style={styles.label}>Tech Stack (Comma Separated)</label>
        <input type="text" name="techStack" value={formData.projectDetails.techStack} onChange={handleChange} style={styles.input} />
        
        <label style={styles.label}>GitHub Link</label>
        <input type="url" name="githubLink" value={formData.projectDetails.githubLink} onChange={handleChange} style={styles.input} />

        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Save Changes
          </button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Use the same styles object defined in AddProjectForm for consistency
const styles = {
    formContainer: {
        padding: '20px',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '600px',
        color: 'var(--color-text-primary)'
    },
    heading: {
        color: 'var(--color-accent)',
        borderBottom: '2px solid var(--color-accent)',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        border: '1px solid var(--color-text-secondary)',
        borderRadius: '4px',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
    },
    textarea: {
        resize: 'vertical',
        minHeight: '100px',
    },
    buttonGroup: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'var(--color-text-secondary)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: '#dc3545',
        marginTop: '10px',
    }
};

export default EditProjectForm;