# Exposing a deployment to the outside worl using a NodePort service

In this tutorial, we will create a NodePort service for our deployment so that we can access the managed pods from outside the cluster.
(In the previous tutorials, we created a Cluster-IP for the deployment, which was only accessible from inside the cluster)


## Start the cluster, create and scale a deployment
We will utilize the custom docker image from [tutorial 3 - custom image](./../3.%20custom%20image/)
.

```
minikube start
kubectl create deployment k8s-web --image=4853383/node-kubernetes
kubectl scale deployment k8s-web --replicas=3
```


## Create service with type NodePort

To expose the deployment to outside of the cluster, we create a NodePort-type service:

```
kubectl expose deployment k8s-web --type=NodePort --port=3000
```

Verify that the service has been created:

```
kubectl get service
```

You should now see a service of type NodePort.
In the "PORT(S)" column, you will see something like 3000:31723/TCP.
This means, that the port 3000 from the deployment is now exposed to the port 31723 of the Node on which this deployment is running (note that 31723 will probably differ as it is created randomly).

Now we can connect to the deployment using the IP-Address of the node in conjunction with the exposed port of our service.
To get the IP-Address of your node, type:

```
minikube ip
```

## Connect to your deployment from your host machine

The output of my previous command is e.g.: 192.168.49.2

Go to your favourite webbrowser and visit <ip-address>:<service-port> from the previous commands to access the webbrowser.

**Note** if you are using Docker to run your cluster and the above method does not work, execute

```
minikube service web --url
```

and paste the received url into your browser.

**Congratulation, you succesfully exposed your deployment to the world!**




