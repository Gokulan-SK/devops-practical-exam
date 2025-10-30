// Jenkinsfile
pipeline {
    agent any // Specifies an available Jenkins executor

    tools {
        // REQUIRED: Ensure Node.js is installed/configured in Jenkins Global Tools
        nodejs 'node-18' // Replace 'node-18' with your configured Node.js installation name
    }

    stages {
        stage('Checkout Code') {
            steps {
                // IMPORTANT: Replace with your actual GitHub HTTPS URL
                git branch: 'main', url: 'https://github.com/Gokulan-SK/devops-practical-exam.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Using Node.js tool defined above
                sh 'npm install' 
            }
        }
        
        stage('Build Application') {
            steps {
                // Creates the production ready 'dist' folder (Vite build)
                sh 'npm run build' 
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                // Archives the production output (Completes Task Step 3: Archive build artifacts)
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
}