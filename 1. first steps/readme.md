# First steps
Required software:
- minikube
- kubectl
- docker

This part covers some essentials and how to manually create pods and interact with the cluster using kubectl.

## start cluster (startup.bat)
```
minikube delete 
minikube start 
minikube status 
minikube ip
minikube ssh
```
a shell inside the node should automatically open;
type:
```
docker ps
```
 to view all the containers that are running inside the single node.

## Explore the cluster 
Open another terminal
```
kubectl cluster-info 
kubectl get nodes 
kubectl get pods 
kubectl get namespaces
kubectl get pods --namespace=kube-system
```

## Create your first pod
Create your first pod with the nignx webserver docker image manually:

```
kubectl run nginx --image=nginx
kubectl get pods
kubectl describe pod nginx
```

ssh into master node and again check to see that now 2 additional containers are running:

```
minikube ssh
docker ps
```
- nginx pod (nginx webserver docker image = app)
- the pause container for nginx pod (to lock namespaces if pods are recreated etc.)

While stil in ssh in the master node, execute:
```
docker exec -it <nginx docker id> sh to enter a shell inside the nginx pod
hostname -i
```

Substituting the ip-address received with the previous command, execute:
```
curl <ip-address>
```
to get the welcome page of the nginx webserver of the nginx pod.

Delete the pod with: 
```
kubectl delete pod nginx
```


**Manually creating pods is not efficient as you can not scale them. See the next section on the deployments.**