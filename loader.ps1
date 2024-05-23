# Define the image name to filter
$image_name = "roguebit02/echonet:dev"

while($true)
{
    echo "Deleting existing containers..."

    $images = docker ps -a -q --filter ancestor=$image_name

    foreach($id in $images)
    {
        echo "Stopping $id..."
        docker stop $id
        echo "Deleting $id..."
        docker rm $id
    }

    docker pull $image_name
    echo "Creating new container..."
    $container_id = docker container create --mount type=bind,source=$PWD\\config,target=/app/config -p 3000:3000 --name echonet-node-lm $image_name

    echo "Starting container..."
    docker start $container_id 
    read-host “Press ENTER to fetch newest image...”
}