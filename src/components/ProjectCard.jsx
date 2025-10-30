// src/components/ProjectCard.jsx

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx'; 
// Optional Icons (assuming you installed @mui/icons-material)
import { Delete, Edit } from '@mui/icons-material'; 

const ProjectCard = ({ project, onEditStart }) => {
  const { deleteProject } = usePortfolio();

  // Deletes the project after user confirmation
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the project: "${project.title}"?`)) {
      deleteProject(project.id);
    }
  };

  // --- RENDERING ---
  return (
    <div style={cardStyles.card}>
      
      {/* 1. Title and Student Name */}
      <div style={cardStyles.header}>
        <h3 style={cardStyles.title}>{project.title}</h3>
        <span style={cardStyles.studentName}>By: {project.studentName}</span>
      </div>
      
      {/* 2. Brief Description and Date */}
      <p style={cardStyles.description}>
        {project.projectDetails.description}
      </p>
      
      <div style={cardStyles.meta}>
        <span style={cardStyles.date}>
          Added: {new Date(project.dateAdded).toLocaleDateString()}
        </span>
      </div>

      {/* 3. Tech Stack Tags */}
      <div style={cardStyles.techStack}>
        {project.projectDetails.techStack.map((tech, index) => (
          <span key={index} style={cardStyles.techTag}>
            {tech}
          </span>
        ))}
      </div>
      
      {/* 4. Action Buttons (CRUD - U and D) */}
      <div style={cardStyles.actions}>
        <button 
          onClick={() => onEditStart(project)} 
          style={{...cardStyles.actionButton, backgroundColor: '#556B2F'}}
          title="Edit Project"
        >
          <Edit style={{ fontSize: 16 }} /> Edit
        </button>
        <button 
          onClick={handleDelete} 
          style={{...cardStyles.actionButton, backgroundColor: '#A0522D'}}
          title="Delete Project"
        >
          <Delete style={{ fontSize: 16 }} /> Delete
        </button>
      </div>

    </div>
  );
};

// --- Project Card Styles ---
const cardStyles = {
  card: {
    backgroundColor: 'var(--color-bg-card)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid var(--color-text-secondary)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    color: 'var(--color-text-primary)'
  },
  header: {
    borderBottom: '1px solid var(--color-text-secondary)',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  title: {
    margin: '0 0 5px 0',
    color: 'var(--color-accent)', 
    fontSize: '1.4rem',
  },
  studentName: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
  },
  description: {
    fontSize: '1rem',
    flexGrow: 1, // Allows the description to take available space
  },
  meta: {
    marginTop: '10px',
    fontSize: '0.85rem',
    color: 'var(--color-text-secondary)',
  },
  date: {
    display: 'block',
    marginBottom: '10px',
  },
  techStack: {
    marginBottom: '15px',
  },
  techTag: {
    display: 'inline-block',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    fontSize: '0.75rem',
    padding: '5px 8px',
    borderRadius: '4px',
    marginRight: '5px',
    marginTop: '5px',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '1px solid var(--color-text-secondary)',
  },
  actionButton: {
    padding: '8px 15px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
};

export default ProjectCard;