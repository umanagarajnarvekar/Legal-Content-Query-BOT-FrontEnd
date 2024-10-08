pipeline {
   agent any
   environment {
       
       DOCKER_IMAGE = "aloksahni/querybot_app_fe"
       DOCKER_CREDENTIALS_ID = 'dockerhubid' // Jenkins credentials ID for Docker Hub
       SONAR_SERVER = 'sonarserver' // SonarQube server name in Jenkins
       SONAR_PROJECT_KEY = 'querybot_app'
       AKS_CLUSTER_NAME='bayer_cluster'
	   AKS_RESOURCE_GROUP='BAYER'
	   AKS_NAMESPACE='default'

   }
   
   stages {
       stage('Checkout Code') {
           steps {
               // Checkout source code from a Git repository
			   //script {
			  // sh 'git clone https://umanagarajnarvekar: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@github.com/umanagarajnarvekar/Legal-Content-Query-BOT-FrontEnd.git'
           
                git url: 'https://github.com/umanagarajnarvekar/Legal-Content-Query-BOT-FrontEnd.git', branch: 'main'			       
			   //}
		   }
       }
       
        stage('Building the Docker image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}")
                }
            }
        }

        stage('Running Sonarqube test') {
            environment {
                scannerHome = tool 'sonarscanner';
            }
            steps {
              withSonarQubeEnv(credentialsId: 'sonarid', installationName: 'sonarserver') {
                sh "${scannerHome}/bin/sonar-scanner"
              }
            }
        }
       /* stage('Quality Gate Check') {
            steps {
                script {
                    // Wait for SonarQube Quality Gate result
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qualityGate.status}"
                        }
                    }
                }
        }*/
    stage('Pushing image to Dockerhub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhubid') {
                        docker.image("${env.DOCKER_IMAGE}").push()
                    }
                }
            }
        }
        
	   
	stage('Deploy to AKS') {
          steps {
            withKubeConfig([credentialsId: 'kubeconfigid']) {
              sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"'
              sh 'chmod u+x ./kubectl'
              sh './kubectl apply -f k8smanifest.yml'
                }
          }
        }
		}
   post {
       success {
           echo 'Pipeline completed successfully'
           sh 'touch /tmp/a2.txt'
       }
       failure {
           echo 'Pipeline failed'
       }
   }
}
