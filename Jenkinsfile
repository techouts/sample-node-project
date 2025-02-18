node {
    // reference to maven
    def mvnHome = tool 'maven-3.8.5'

    // holds reference to docker image
    def dockerImage
    // ip address of the docker private repository (nexus)
    def dockerRepoUrl = "localhost:8083" // use localhost or 127.0.0.1
    def dockerImageName = "hello-world-java"
    def dockerImageTag = "${dockerRepoUrl}/${dockerImageName}:${env.BUILD_NUMBER}"
    
    stage('Clone Repo') {
        git 'https://github.com/dstar55/docker-hello-world-spring-boot.git'
    }
  
    stage('Build Project') {
        sh "'${mvnHome}/bin/mvn' -Dmaven.test.failure.ignore clean package"
    }

    stage('Publish Tests Results'){
        parallel(
            publishJunitTestsResultsToJenkins: {
                echo "Publish junit Tests Results"
                junit '**/target/surefire-reports/TEST-*.xml'
                archive 'target/*.jar'
            },
            publishJunitTestsResultsToSonar: {
                echo "This is branch b"
            }
        )
    }

    stage('Build Docker Image') {
        sh "whoami"
        sh "mv ./target/hello*.jar ./data" 
        dockerImage = docker.build("${dockerImageName}", "./")
    }

    stage('Deploy Docker Image') {
        echo "Docker Image Tag Name: ${dockerImageTag}"
        sh "docker login -u srikanthtechouts -p Techouts@123 ${dockerRepoUrl}"
        sh "docker tag ${dockerImageName} ${dockerImageTag}"
        sh "docker push ${dockerImageTag}"
    }
}
