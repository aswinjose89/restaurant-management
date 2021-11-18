FROM node:12-alpine3.13

LABEL MAINTAINER aswin1906@gmail.com

ENV WORK=/app

WORKDIR ${WORK}

COPY . ${WORK}

RUN npm install

EXPOSE 4200

# Run the specified command within the container.
CMD [ "npm", "run", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
