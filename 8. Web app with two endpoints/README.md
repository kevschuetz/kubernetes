# Web app with two endpoints

The following steps show the integration of two deployments.

## Creation of new customer image

Therefore a new folder was created. The folder can be seen in k8s/ks8-web-to-nginx in this repo. For the folder the existing folder k8s/ks8-web-hello was simply duplicated and renamed. The index.mjs file was extended by one function. The code of the function can be seen below. 

```
app.get("/nginx", async (req, res) => {
    const url = 'http://nginx'
    const response = await fetch(url);
    const body = await response.text()
    res.send(body)
})
```

If the path /nginx of the image is called the output of the http://nginx endpoint will be fetched. For the function to work the node-fetch package needs to be installed using the command in the ks8-web-to-nginx folder.

```
npm install node-fetch
```

The newly created image then needs to be uploaded to the dockerhub as shown in section 3.  

## Combining service yaml and deployment yaml for k8s-web-to-nginx

Multiple yaml files can be combined in a single one to fasten the creation process. In this example the content of service.yaml and deployment.yaml is copied in the new file and separated with ---.
In the new file, all occurrences of k8s-web-hello were changed to k8s-web-to-nginx. Additionally, the port of the service was changed to 3333. The newly created file can be seen in the k8s folder of this repo. 

## Creating yaml file for nginx

For the creation of a nginx service and deployment, a new yaml file is created as a copy of the k8s-web-to-nginx.yaml. All occurrences of k8s-web-to-nginx are changed to nginx. Also, the type for the service was removed and the port set to 80. For the image of the deployment needs to be changed to the docker image nginx. Additionally, the port of the deployment needs to be changed to 80. 

## Delete the exisiting deployment and service

Again like in chapter 7 with the command:

```
kubectl delete all -all
```

## Execute the yaml files

Both yaml file can be executed wiht a single command.

```
kubectl apply -f k8s-web-to-nginx.yaml -f nginx.yaml
```

Through the command two services and two deployments are created. Additonally the pods correspesponding pods are stared. The service is now available. When navigate to /nginx the contend of the nginx image is visible. 


