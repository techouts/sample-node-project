pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-token', branch: 'test', url: 'https://github.com/SSL-Enhancements/ssl-beauty-web.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app:latest .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker stop my-node-app || true'
                sh 'docker rm my-node-app || true'
                sh 'docker run -d --name my-node-app -p 3000:3000 my-node-app:latest'
            }
        }
    }
}
