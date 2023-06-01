pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }
        stage('Test') {
            steps {
                bat 'rmdir /s /q allure-results && mkdir allure-results'
                bat 'npx playwright test'
            }
        }}
    post{
        always{
            bat 'npx allure generate allure-results --clean'
            step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
           }
    }
    }
}
