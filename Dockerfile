# syntax=docker/dockerfile:1
FROM node:16.15.1
#ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
#RUN npm install --production
RUN npm install
COPY . .
EXPOSE  8080
CMD ["/bin/bash"]
#CMD [ "node", "nodeServerUNL_NoSsl.js" ]