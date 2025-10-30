// Jenkinsfile

pipeline {
    agent any

    tools {
        nodejs 'node-18' // Assuming you used 'nodejs-18' to fix the last issue
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ... git command ...
            }
        }

        stage('Install Dependencies') {
            steps {
                // FIX: Changed 'sh' to 'bat'
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                // FIX: Changed 'sh' to 'bat'
                bat 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Note: archiveArtifacts itself does not need sh/bat
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
}