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
            }
        // stage('Generate Allure report') {
        //     steps {
        //         // bat 'mkdir allure-results'
        //         // bat 'npx allure generate allure-results --clean'
        //         // step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
        
        //        // bat 'allure generate allure-results --clean -o allure-report && allure open allure-report'    
        //     }
        // }
    
    }
    post{
        always{
            bat 'npx allure generate allure-results --clean'
            step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
            
             emailext (
                subject: "Pipeline Status: ${currentBuild.currentResult}",
                body: """<p>Pipeline Status: ${currentBuild.currentResult}</p>
                        <p>View the job: ${env.BUILD_URL}</p>""",
                to: "nikhil.thakare@successive.tech",
                from: "onkar.jadhao@successive.tech",
                replyTo: "omkar.pabale@successive.tech",
                mimeType: 'text/html'
            )
            
        }
    }
}
