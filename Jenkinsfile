pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    string(credentialsId: 'test-username', variable: 'TEST_USERNAME'),
                    string(credentialsId: 'test-password', variable: 'TEST_PASSWORD')
                ]) {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'results/junit.xml'

            publishHTML target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                allowMissing: true,
                alwaysLinkToLastBuild: true
            ]

            archiveArtifacts artifacts: 'test-results/**,playwright-report/**',
                             allowEmptyArchive: true
        }
    }
}