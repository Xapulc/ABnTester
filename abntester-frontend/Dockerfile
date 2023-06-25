FROM node:16-alpine
WORKDIR /app
COPY dist/server /app/
COPY package.json /app/
COPY dist/client /app/public/feedback/statics
ENV NODE_ENV='production'

EXPOSE 4200
CMD [ "node", "--max-http-header-size=80000", "/app/server.js" ]
