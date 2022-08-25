# syntax=docker/dockerfile:1
FROM node:16.15.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
EXPOSE  8081
CMD ["/bin/bash"]
#CMD [ "node", "nodeServerUNL_NoSsl.js" ]