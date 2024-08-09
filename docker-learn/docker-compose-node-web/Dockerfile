FROM node:14-alpine as base
WORKDIR /src 
COPY package*.json / 
EXPOSE 3000
# 下面是多阶段构建，可以针对不同环境构建不同镜像;构建时需要指明要触发哪个阶段production和dev
# 生产环境
FROM base as production 
ENV NODE_ENV=production 
RUN npm ci 
COPY . . 
CMD ["npm", "start"] 
 
# 开发环境
FROM base as dev 
ENV NODE_ENV=development 
RUN npm install 
COPY . . 
CMD ["npm", "start"] 