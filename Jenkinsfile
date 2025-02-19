pipeline {
    agent any
    environment {
        MVN_HOME = tool 'maven-3.8.5'
        DOCKER_HUB_REPO = "srikanthtechouts/hello-world-java"
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
                parallel(
                    publishJunitTestsResultsToJenkins: {
                        echo "Publishing JUnit test results"
                        junit '**/target/surefire-reports/TEST-*.xml'
                        archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                    },
                    publishJunitTestsResultsToSonar: {
                        echo "Sonar analysis placeholder (implement as needed)"
                    }
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "whoami"
                    sh "mv ./target/hello*.jar ./data"
                    docker.build("${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}", "./")
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
    }
}
