pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 18'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-jenkins', branch: 'test', url: 'https://github.com/techouts/sample-node-project.git'
            }
        }

       

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker stop my-node-app || true'
                sh 'docker rm my-node-app || true'
                sh 'docker run -d --name my-node-app -p 3000:3000 --network host my-node-app'
            }
        }
    }
}
