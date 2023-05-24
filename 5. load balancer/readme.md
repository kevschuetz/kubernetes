# Create a Load-Balancer service for your deployment

In this tutorial, you will create a load-balancer service for your deployment. 

## Setup your cluster and deployment

See [tutorial 4](./../4.%20expose%20to%20the%20world/) on how to setup your cluster and deployment. *Create no service yet*

## Create LoadBalancer service

```
kubectl expose deployment web --type=LoadBalancer --port=3000
```

Verify servcie:

```
kubectl get service
```

*Note that the *EXTERNAL-IP* of the service stays pending when using minikube. If the cluster is deployed to the cloude for example, an external-ip is assigned and can be used to access the load-balanced service.*

