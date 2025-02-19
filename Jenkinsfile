pipeline {
    agent any

    environment {
        MVN_HOME = tool 'maven-3.8.5'
        DOCKER_HUB_REPO = "srikanthtechouts/hello-world-java"
        CONTAINER_NAME = "hello-world-container"
        APP_PORT = "8081"
        REMOTE_HOST = "172.168.168.99"   // Replace with your remote Ubuntu server IP
        REMOTE_USER = "tech"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/dstar55/docker-hello-world-spring-boot.git'
            }
        }

        stage('Build Project') {
            steps {
                sh "'${MVN_HOME}/bin/mvn' -Dmaven.test.failure.ignore clean package"
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    echo "Publishing JUnit test results"
                    junit '**/target/surefire-reports/TEST-*.xml'
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "mv ./target/hello*.jar ./data"
                    sh "docker build -t ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    def dockerImageTag = "${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}"
                    sh "docker tag ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER} ${dockerImageTag}"
                    sh "docker push ${dockerImageTag}"
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                script {
                    sshagent(['remote-ubuntu']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} <<EOF
                        docker login -u srikanthtechouts
                        docker pull ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:8080 ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}
                        EOF
                        """
                    }
                }
            }
        }
    }
}
