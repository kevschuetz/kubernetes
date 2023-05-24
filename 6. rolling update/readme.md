# Rolling Update

In this tutorial you will explore how the RollingUpdate update-strategy of a deployment works with kubernetes.
In theory, this means that when the image of a deployment is changed, K8S builds new pods using the new image and replaces them 1 by 1 with the old pods.
For this, we will push a new image to the Docker hub and change the image of our the deployment.

You can start this tutorial where we left off in [tutorial 5](./../5.%20load%20balancer/).

## Build and push new image

See [tutorial 3](./../3.%20custom%20image/) on how to build and push an image to docker hub. 
The [index-file](./index.mjs) in this directory represents the updated webapp that will be used to explore the rolling-update strategy.

*At this point you should have pushed the updated application with the tag node-kubernetes:v2 to your Docker hub*.

## Update image and trigger RollingUpdate

To set a new image for your deployment and explore the update procedure, execute both commands shortly after another:

```
kubectl set image deployment/web node-kubernetes=4853383/node-kubernetes:v2
kubectl rollout status deployment web
```

