# npm install
`curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -`

`sudo apt-get install nodejs`

`sudo apt-get install gcc make build-essential`
# install bower
`npm install -g bower`


# install mongodb
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

# run mongo
`mongod --dbpath=../data`

# run with docker
```sudo docker run  -it -v `pwd`:/projet_kevin -p 63342:3000 ubuntu:14.10 bin/bash```