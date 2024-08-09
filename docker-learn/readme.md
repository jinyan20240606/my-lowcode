# 学习docker

> 参考 https://yeasy.gitbook.io/docker_practice/compose

## 安装

1. 前期电脑有问题，安装desktop安装包老是失败，hyperv的虚拟化程序电脑系统里缺失导致失败，后来重装系统win10pro安装成功了

## docker-compose-node-web

> web项目参考：https://www.51cto.com/article/640843.html

- 开发同一份定制镜像文件-Dockerfile，使用他两种方式
    - 1、直接构建镜像运行容器
      - `docker build -t my-node-app:dev --target dev .` 构建镜像
      - `docker run -d --name my-node-app-dev -p 3000:3000 my-node-app:dev` 启动运行容器
        - 这个启动运行会自动退出，后面再看吧，相同的镜像用docker-compose不会自动退出 
    - 2、用docker-compose编排的方式构建镜像运行容器
      - `docker-compose build` 编排构建
      - `docker-compose up` 编排运行容器 