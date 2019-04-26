# azure-func-spike

Port of roles spike from HAPI API to Azure function
## Prerequisites 
Install az command line tool as described [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest)

Install azure functions core tools as described [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2). Below are the steps for Ubuntu/WSL Ubuntu
```
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install azure-functions-core-tools
func
sudo add-apt-repository universe
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.2
```

a new project can then be intialised with the `func`command 
`func init AzureLinuxFunction` choose node from the list, language Javascript

a new function can be added to the project with the commanmd
`func new --name MyFunction --template "HttpTrigger"`

the function can be tested locally with
`func host start`

## Create Azure resources, storage and apps to host the function

The below command can be used to create the infrastructure to run the app
substitute the 'mh' prefix with your own to avoid collisions in resource, storage, and app names
```
az group create --name mhResourceGroup --location westeurope
az storage account create --name mhffcstorage --location westeurope --resource-group mhResourceGroup --sku Standard_LRS
az functionapp create --resource-group mhResourceGroup --consumption-plan-location westeurope --os-type Linux --name mhffctestapp --storage-account mhffcstorage --runtime node
func azure functionapp publish mhffctestapp
```

the publish process will end with displaying the URL of the available app, for the above configuration running this repository a sample URL is https://mhffctestapp.azurewebsites.net/api/roles/user01/plan01
