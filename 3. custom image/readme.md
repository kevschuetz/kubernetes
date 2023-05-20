# Build and use a custom docker image

In this mini-tutorial, you will build a custom docker image based on a NodeJS web-service, push it to docker hub and use this image to create a deployment in your kubernetes cluster.

Additional dependencies for this tutorial:
- NodeJS


# Create your own web-application
You can either create the project on your own or use the own already present.

Initialize a NodeJS project and install Express:

```
npm init
npm install express
```
*When initializing the project, use index.mjs as the entrypoint.*
This will initialize a NodeJS project.

Create an index.mjs file defining your application.
Add a start script to your package.json. (node index.mjs)

To verify if everything worked, run node index.mjs and visit port 3000 in your favourite browser.
Now you can delete the node_modules folder, as we will not run our app locally but rather build a docker image of it.

# Create a dockerfile and build the image

To build an image for our application, we have to create a dockerfile.

Afterwards, we can build the image:

```
docker build . --tag node-kubernetes
```

You can verify that everything worked by starting a container based on your image and visiting port 3000 in your favourite browser:

```
docker run -p 3000:3000 node-kubernetes
```
*You should see the output: Listening on port 3000.*

# Push the image to your docker hub

To push the image to your docker hub, you ned an account. Afterwards, you can retag the built image and push it:

```
docker login
docker tag node-kubernetes 4853383/node-kubernetes
docker push 4853383/node-kubernetes
```
*Replace 4854483 with your username.*

The image should now be pushed to your docker hub.

# Create a deployment based on your pushed docker image

## Start the cluster

```
minikube delete
minikube start
```
## Create a deployment

```
kubectl create deployment node-kubernetes --image=4853383/node-kubernetes
```

This creates a deployment for your kubernetes cluster based on your custom image.

## Create cluster-ip service for the deployment

```
kubectl expose deployment node-kubernetes --port=3000
```

## Scale deployment

```
kubectl scale deployment node-kubernetes --replicas=4
```

Now you can again ssh into your cluster and curl your pods based on the cluster-ip of your deployment.

```
kubectl get service
minikube ssh
curl 10.111.82.49:3000
```
*Replace the ip with the cluster-ip of your node-kubernetes service.*

You should now receive different hostnames everytime you execute the curl-statement, depending on which of your 4 pods answered the request.

**Congratulation, you created a Express NodeJS application, built a docker image from it, pushed it to your docker hub and created a kubernetes cluster with a deployment for your image to automatically scale your service.**






