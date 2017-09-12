# use official nodev7 image as parent
From node:7

# set the working directory to /app
WORKDIR /app

# force an npm install if this file changes
# else, docker will use cached values
ADD package.json /app

# install packages
RUN npm install --loglevel=warn

# copy current directory into container
ADD . /app

# expose a port to the host
EXPOSE 3000

# start the app
CMD ["npm", "start"]
