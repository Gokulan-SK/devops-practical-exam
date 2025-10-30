// src/components/HomePage.jsx

import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import ProjectCard from './ProjectCard.jsx';

// Separate this out for reusability
const HomePage = ({ onAddProjectClick, onEditStart }) => {
    const { projects } = usePortfolio();
    
    // State for Custom Feature #2: Sorting
    const [sortBy, setSortBy] = useState('newest'); 
    
    // --- Custom Feature #2: Project Sorting Logic ---
    const sortedProjects = useMemo(() => {
        let sorted = [...projects];

        if (sortBy === 'newest') {
            // Newest: Sort by dateAdded in descending order
            sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        } else if (sortBy === 'oldest') {
            // Oldest: Sort by dateAdded in ascending order
            sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        } else if (sortBy === 'title') {
             // Title: Sort alphabetically
             sorted.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        // Only display the 6 most recent (for "Recently Added")
        return sorted.slice(0, 6); 

    }, [projects, sortBy]); // Recalculate only when projects or sortBy changes

    // --- RENDERING ---
    return (
        <div style={homeStyles.mainContainer}>
            
            {/* Quick Action Center (CTA Section) */}
            <div style={homeStyles.quickActionCenter}>
                <h1>Welcome to the Student Portfolio Manager</h1>
                <p>Manage all your academic and personal projects here.</p>
                <button 
                    onClick={onAddProjectClick} 
                    style={homeStyles.ctaButton}
                >
                    + Add New Project
                </button>
            </div>
            
            {/* Sorting Control (Custom Feature #2 UI) */}
            {projects.length > 0 && (
                <div style={homeStyles.sortControl}>
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={homeStyles.select}>
                        <option value="newest">Date Added (Newest First)</option>
                        <option value="oldest">Date Added (Oldest First)</option>
                        <option value="title">Project Title (A-Z)</option>
                    </select>
                </div>
            )}


            {/* Recently Added Projects (The Read View) */}
            <h2>Recently Added Projects ({projects.length} Total)</h2>
            
            {projects.length === 0 ? (
                <p style={homeStyles.emptyMessage}>
                    No projects found. Use the 'Add New Project' button to get started!
                </p>
            ) : (
                <div style={homeStyles.projectGrid}>
                    {sortedProjects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project}
                            onEditStart={onEditStart} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// --- Styles for the Home Page ---
const homeStyles = {
    mainContainer: {
        padding: '20px 0',
    },
    quickActionCenter: {
        textAlign: 'center',
        padding: '50px 20px',
        margin: '40px auto',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'var(--color-text-primary)',
    },
    ctaButton: {
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: 'var(--color-accent)', // Deep Rust color
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '20px',
        transition: 'background-color 0.2s',
    },
    projectGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    emptyMessage: {
        textAlign: 'center',
        padding: '30px',
        border: '1px dashed var(--color-text-secondary)',
        borderRadius: '6px',
        color: 'var(--color-text-secondary)',
    },
    sortControl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '20px',
        gap: '10px',
        fontSize: '1.1rem',
        color: 'var(--color-text-primary)'
    },
    select: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid var(--color-text-secondary)',
        backgroundColor: 'var(--color-bg-card)',
        color: 'var(--color-text-primary)'
    }
};

export default HomePage;