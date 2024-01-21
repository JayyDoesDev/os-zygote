FROM node:20

WORKDIR /os-zygote

COPY package*.json ./

RUN yarn 

COPY  . .

EXPOSE 3000:8080

CMD ["yarn", "start"]