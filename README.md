# Instrucciones para que el proyecto funcione:

### 1. Habilitar Kubernetes en docker desktop 🐳
Verificarlo ejecutando el comando `kubectl get nodes`

### 2. Instalar Helm 🚢
Instalar helm en nuestra maquina local
```
choco install kubernetes-helm
```

### 3. Instalar OpenFaaS
```bash
# Agregar repositorio de OpenFaaS
helm repo add openfaas https://openfaas.github.io/faas-netes/
helm repo update

# Crear namespaces
kubectl apply -f https://raw.githubusercontent.com/openfaas/faas-netes/master/namespaces.yml

# Instalar OpenFaaS
helm upgrade openfaas --install openfaas/openfaas `
    --namespace openfaas `
    --set functionNamespace=openfaas-fn `
    --set generateBasicAuth=true `
    --set serviceType=NodePort

```

- Para obtener lass credenciales del user admin
    ```bash
    $password=kubectl -n openfaas get secret basic-auth -o jsonpath='{.data.basic-auth-password}'

    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($password))
    ```

### 5. Instalar OpenFaaS CLI
```bash
#Opcion 1:
Invoke-WebRequest -Uri https://cli.openfaas.com -OutFile faas-cli.exe

#Opcion 2 (recomendada con choco):
choco install faas-cli
```

### 6. Configurar el CLI
Procedemos a configurar el cli en el puerto de su preferencia, y con el password obtenido en pasos anteriores
```bash
$env:OPENFAAS_URL="http://localhost:8081"

faas-cli login --username admin --password [PASSWORD_OBTENIDA]
```

- Para activar o cambiar el port-fordwarding, ejecuta 
    ```bash 
    kubectl port-forward -n openfaas svc/gateway 8080:8080
    ``` 
( Mantenerlo ejecutando en otra ventana, de ser necesario cambia el puerto de mappeo 808X:8080 )


### 7. Usar templates del CLI
- Instalamos los templates disponibles con `faas-cli template pull`
- Para ver los templates disponinbles `faas-cli template store list`
- Para crear y usar un template:
    ``` bash
    faas-cli new nombre_funcion --lang template_a_utilizar --prefix=tu_usuario_dokerhub
    ```

### 8. Construir y desplegar
- Para construir
    ```bash
    faas-cli build -f .\nombre_funcion.yml --verbose
    ```
PD: Al construirla podras tener la imagen y correrla de forma local con docker desktop con un `docker run -p 8081:8080 --name my-function name_image:tag`
- Para desplegar
    ```bash
    #login en docker
    docker login -u tuusuario

    #desplegar
    faas-cli up -f .\nombre_funcion.yml
    ```
- Para verificar si se subio `faas-cli list`
