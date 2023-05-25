# Deployment with YAML files
The deployment can be fastened by storing the information concerning the deployment and service in a YAML file. With a single command the files can be built and modified. 
In this step one file for the service and one for the deployment are created. The used files can be seen in the k8s folder of this repository. The files are building the same composition as in chapter 5 (Load Balancer). 

## Deletion of previously built deployment and service
First the previously created deployment and service need to be deleted. Therefore the command 

```
kubectl delete all -all
```

is executed.

## Creation of the deployment file
For the deployment a deployment.yaml is created. With the vsCode plugin for Kubernetes the creation can be fastened through the application of a default template. In the template the name of the deployment needs to be set. Additionally, the image needs to be defined. As previously shown, the customer image stored in the docker hub will be used. The container port is set to 3000. More information concerning the configuration can be found in Kubernetes Documentation. 
The file can then be used for the creation of the deployment with the command

```
kubectl apply -f deployment.yaml
```

## Adjusting the number of pods
In the specification file the number of pods in the deployment can be adjusted. Therefore in the yaml file in the spec section, the value replicas were added and set to 4. By running the same command as above again the deployment can be recreated.  

## Creation of the service file
A similar approach is applied for the creation of the service. A service.yaml file is created. Again through the Kubernetes plugin a template can be used. The name needs to be set to k8s-web-hello and the ports need to be adjusted. The target port is set to 3000 and the port to 3030. Therefore port 3000 is exposed to the external port 3030. 
Lastly, the type of service needs to be set. Under the spec section, a type attribute is created and set to LoadBalancer. 
The following command is then used to create the service. 

```
kubectl apply -f service.yaml
```

