// Jenkinsfile

pipeline {
    agent any

    tools {
        // FIX: Reverted to 'nodejs-18' because the build said it expected it.
        // Assuming your Global Tool Config is now fixed to use 'nodejs-18'
        nodejs 'node-18' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // FIX: Added the necessary git step back in!
                git branch: 'main', url: 'https://github.com/Gokulan-SK/devops-practical-exam.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // ... (bat 'npm install')
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                // ... (bat 'npm run build')
                bat 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // ... (archiveArtifacts)
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
}