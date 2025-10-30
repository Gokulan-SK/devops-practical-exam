// src/components/AddProjectForm.jsx

import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx'; // Import hook to get addProject

const initialState = {
  studentName: '',
  title: '',
  projectDetails: {
    techStack: '', // Will be processed into an array
    description: '',
    githubLink: '',
  },
};

const AddProjectForm = ({ onClose }) => {
  const { addProject } = usePortfolio();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested details object
    if (name === 'techStack' || name === 'description' || name === 'githubLink') {
      setFormData(prev => ({
        ...prev,
        projectDetails: {
          ...prev.projectDetails,
          [name]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.title || !formData.studentName || !formData.projectDetails.description) {
        setError("Please fill in all mandatory fields.");
        return;
    }

    // Process techStack string into an array of trimmed strings
    const techStackArray = formData.projectDetails.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    const projectToSave = {
      ...formData,
      projectDetails: {
        ...formData.projectDetails,
        techStack: techStackArray,
      }
    };

    addProject(projectToSave);
    setFormData(initialState); // Reset form
    onClose(); // Close the modal or navigate back
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.heading}>Add New Project</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Basic Info Fields */}
        <label style={styles.label}>Student Name (Mandatory)</label>
        <input 
          type="text" 
          name="studentName" 
          value={formData.studentName} 
          onChange={handleChange} 
          style={styles.input}
          required
        />
        
        <label style={styles.label}>Project Title (Mandatory)</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          style={styles.input}
          required
        />

        {/* Project Details Fields */}
        <label style={styles.label}>Description (Mandatory)</label>
        <textarea 
          name="description" 
          value={formData.projectDetails.description} 
          onChange={handleChange} 
          style={{ ...styles.input, ...styles.textarea }}
          required
        />

        <label style={styles.label}>Tech Stack (Comma Separated)</label>
        <input 
          type="text" 
          name="techStack" 
          placeholder="e.g., React, Node.js, MongoDB"
          value={formData.projectDetails.techStack} 
          onChange={handleChange} 
          style={styles.input}
        />
        
        <label style={styles.label}>GitHub Link</label>
        <input 
          type="url" 
          name="githubLink" 
          value={formData.projectDetails.githubLink} 
          onChange={handleChange} 
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Add Project
          </button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Basic Form Styles ---
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

export default AddProjectForm;