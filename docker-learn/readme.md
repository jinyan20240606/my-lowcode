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
        - 
    - 2、用docker-compose编排的方式构建镜像运行容器
      - `docker-compose build` 编排构建
      - `docker-compose up` 编排运行容器 
## 遇到的问题

1. 上面直接构建镜像运行容器发现运行不起来
    - 原因：直接将dockerignore里忽略node_modules，导致手动构建镜像时，没有把依赖打进去，所以报错容器启动失败。把dockerignore文件删了就能docker扩展里右键运行就启动起来了
    - 用docker-compose构建运行为什么可以：因为compose配置文件里设置了volumes卷挂载选项会自动将当前所有文件挂载到/src下面所以依赖也过去了。 
    - 卷挂载时不会遵循dockerignore忽略规则。这个只是控制构建镜像时的忽略，不要复制到镜像的工作目录里。卷挂载是挂载到创建的容器里，跟镜像目录不是一个层级。一般正规都是node_modules存储到容器目录里 而不是镜像目录里