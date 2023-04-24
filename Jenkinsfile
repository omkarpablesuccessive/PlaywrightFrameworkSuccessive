pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npx playwright test'
                // bat 'npx allure generate allure-results --clean'
                // step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
            }
        stage('Generate Allure report') {
            steps {
                bat 'allure generate allure-results --clean -o allure-report && allure open allure-report'
                 bat 'rd /s /q allure-results && mkdir allure-results'
            }
        }
        }
    }
}
