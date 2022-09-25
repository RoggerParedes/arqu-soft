FROM node:16
RUN mkdir /opt/app
WORKDIR /the/workdir/path
COPY index.js package.json package-lock.json ./
RUN npm install
ENTRYPOINT [ "node","index.js" ]