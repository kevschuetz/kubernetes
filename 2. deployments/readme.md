# Deployments
A deployment automatically manages a pod so that they can be recreated and scaled.

This part will cover the creation of the first deployment for an nginx webserver and also how to create a service for the pod
so that we can interact with the webserver from the outside world.

## Create a deployment for the nginx webserver
```
kubectl create deployment nginx-deployment --image=nginx
kubectl describe deployment nginx-deployment
kubectl describe pod nginx
```
Deployments and pods are different objects that are linked by the selector (the selector of the deployment is the label of the pod).

Replica sets contain all pods managed by a deployment.

## Scale the deployment

To increase the number of pods for the nginx-deployment, execute the following command:

```
kubectl scale deployment nginx-deployment --replicas=5
```

This increases the number of pods to 5.

```
kubectl get pods -o wide
```
*Notice that the names of all pods is quite similar; e.g: nginx-deployment-55888b446c-86g29. The first part "nginx-deployment" is the name of our deployment, the second part "55888b446c" is the id of the replica set and the last part "86g29" is the id of the pod. In our example, all pods were created on the single minikube node.*

**By using deployments, kubernetes can automatically scale the pods.**

To scale the deployment down, we can easily execute the previous command and adjust the number of replicas:

```
kubectl scale deployment nginx-deployment --replicas=3
```

However, we can still not interact with our webservers from outside.
To do this, we can again ssh into the cluster:
```
minikube ssh
```

Then we can curl the pod from within the node:

```
curl 10.244.0.4
```
*Again you have to replace the IP-address according to the output of the kubectl get pods -o wide command.*

**The ip addresses of the pods can change dynamically, so relying on them is not a good idea. We can utilize other methods to connect to pods that are managed by a deployment by creating a cluster-ip for the deployment.**

## Create a cluster ip service for the deployment

To expose specific pods of the deployment, we can use a service.
*Nginx webserver is by default listening on port 80.*


```
kubectl expose deployment nginx-deployment --port=8080 --target-port=80
```

This command exposes the internal ports from our pods (80) at the external port of our deployment (8080).

Verify the created service:

```
kubectl get service
```

*A service with the name nginx-deployment should have now been created. The cluster-ip can now be used to connect to any of the pods of the deployment from within the cluster. Again, we cannot connect to the webservice from outside using this method.*

Connect to the deployment from within the cluster:

```
minikube ssh
curl 10.107.79.25:8080
```
*Replace the IP-address with the cluster-ip from the nginx-deployment service (last command). Notice that we receive the result from any of the three pods currently managed by the deployment, without a way of telling which pod exactly returned it.*

Get further information about the created service:

```
kubectl describe service nging-deployment
```

Notice the endpoints of the service, which are the ip-addresses of our three pods on which the load is "balanced".

