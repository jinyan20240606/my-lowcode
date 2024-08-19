# 服务端学习项目

> 参考 https://juejin.cn/book/6918979822425210891/section/7220043907789226016?enter_from=course_center&utm_source=course_center

## 学习docker入门

> 见docker-learn目录

## 13、初始化项目

### 环境搭建

1. 新建docker-compose配置文件：`docker-compose.yml`
    - 通过docker镜像安装mysql，mongodb等软件
2. 初始化数据库可视化客户端
    - MongoDB：安装使用vscode插件客户端：MongoDB for VS Code
    - mysql：使用vsocde插件：Database Client；参照语雀node沉淀中的https://juejin.cn/post/7232098240420905019?share_token=6b73b0fa-cbec-47bf-b05c-65552be2a7bd#heading-3 记录

### nestjs项目初始化

1. 用nest初始化项目
2. 项目拆分
    - 之前设计是微服务，多个工程不太好维护，要Monorepo的方式支持微服务
    - 执行 nest generate app devops
    - nest组织代码模式转化为monorepo模式：可参考https://www.kancloud.cn/juukee/nestjs/2706858
    - nest start // 启动默认的项目
    - nest start devops  // 启动 devops 子模块
3. 用Turborepo管理Monorepo
    - 开多个窗口运行不好用，借助turbo一次性启动所有子应用
    - 接入turbo运行管理
    - 用pnpm start 可以一键启动
4. monorepo间创建公共库
    - monorepo项目中借助nestjs提供的library能力来实现
    - 直接用命令实现即可

## 14、基础大综合

### 选择用express

### 版本控制

使用nestjs提供的版本控制能力

1. 单个请求控制
2. 全局配置请求控制

### 全局返回参数

修改 main.ts 文件，添加 useGlobalInterceptors 全局拦截器，处理统一标准返回值

### 全局异常拦截

异常的测试都在my-lowcode/app.controller文件写过，注释起来了

#### 通用异常拦截
1. 新建src/common/exceptions/base.exception.filter.ts 与 http.exception.filter.ts 两个文件
2. 在 main.ts 文件中添加 useGlobalFilters 全局过滤器

#### 业务异常拦截
1. 新建一个 business.exception.ts 来处理业务运行中预知且主动抛出的异常
2. 简单改造一下 HttpExceptionFilter，在处理 HTTP 异常返回之前先处理业务异常
3. 在 AppController 中重新伪造一个业务异常的场景

### 环境配置

一般在项目开发中，至少会经历过 Dev -> Test -> Prod 三个环境。如果再富余一点的话，还会再多一个 Pre 环境。甚至在不差钱的情况下，每个环境可能都会有多套配置。那么对应的使用的数据库、Redis 或者其他的配置项都会随着环境的变换而改变，所以在实际项目开发中，多环境的配置非常必要

#### 自带环境配置

使用nestjs提供的多环节配置方法

安装`pnpm add @nestjs/config -w` 包

修改app.module.ts

新增.env文件

#### 自定义YAML

用yaml文件替换默认的.env文件读取

1. 禁用默认读取 .env 的规则
2. 安装yaml的node库：`pnpm add yaml -w`
3. 根目录新建.config文件夹

#### 使用自定义配置

最后使用cross-env指定运行环境来使用对应的环境变量

- 安装`pnpm add cross-env -w`
- 修改启动命令

### 文档

作为一个后端服务，API 文档是必不可少的，除了接口描述、参数描述之外，自测也十分方便。NestJS 自带了 Swagger 文档，集成非常简单，接下来进行文档的配置部分

1. 安装`pnpm add @nestjs/swagger -w`
2. 新建src/doc.ts