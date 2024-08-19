# 服务端学习项目

> 参考 https://juejin.cn/book/6918979822425210891/section/7220043907789226016?enter_from=course_center&utm_source=course_center

## 学习docker入门

> 见docker-learn目录

## 包积累

1. class-validator：数据验证包，一般配合dto对象做的

## 13、初始化项目

### 环境搭建

1. 新建docker-compose配置文件：`docker-compose.yml`
    - 通过docker镜像安装mysql，mongodb等软件
    - 通过docker启动数据库底层服务命令：`docker-compose up`
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

### 热重载

默认的watch是有更新直接重新编译，没有加入webpack的热更新功能，如果想加入webpack热更新可以看这节

## 15、数据库工具封装

>  利用ORM框架将封装统一的数据库操作工具类，方便后期开发于集成

ORM框架：对象关系映射（Object-Relational Mapping, ORM）。主要是把传统的面向SQL开发转变为面向对象开发。以操作对象的模式使用数据库
   - 有很多的orm框架如Sequelize，Prisma等，我们这里首推使用TypeORM
   - 有开箱即用的@nestjs/typeorm 软件包支持

### 数据库常见概念

- entities：实体，ORM框架中实体通常与数据库的表对应，如开发一个电商后台时，分别有3个实体，用户，订单，产品。用户这个表中有用户名密码邮箱等属性
- DTO（Data Transfer Object） 与 Entities 的区别，毕竟两个文件都很类似????
    - 首先它们都用于表示数据，但在设计和用途方面有所不同：
    - DTO 是一种数据传输对象，用于在不同的层之间传输数据。它通常用于将数据从数据库层传输到应用程序层，或将数据从应用程序层传输到前端层。DTO 的设计目的是为了最大程度地减少数据传输的开销，通常只包含必要的数据字段，而不包含任何业务逻辑或操作方法。
    - 这个对象一般使用class-validator做校验

    - Entities 是一种实体对象，用于表示应用程序中的业务对象或领域对象。它通常用于表示数据库中的表或文档，或者表示应用程序中的业务对象。Entities 的设计目的是为了封装业务逻辑和操作方法，以便在应用程序中进行操作和处理。
- MongoDB
    - 数据库名字就是databse的值，一个entity实体就相当于一个表如定义的user实体在可视化客户端中是其数据库下的collection，
      表里的每一条数据就是一个Document，每个文档的结构可以有不同字段灵活
    - 会根据orm的语句自动创建数据库，mysql不能自动创建数据库，当新增数据时发现没有这个数据库就会报错

### 封装

没有用nest封装的typeorm工具：@nestjs/typeorm，而是自己根据library和provide和typeorm包封装的typeorm工具

1. 直接使用typeorm的方式，自由封装Providers导入使用
2. 我们已经采用Monorepo的方式且使用Lib的模块，所以将封装工具类收敛进libs/comm,所以这一步开始都是基于libs/comm工具库
3. 安装包`pnpm add typeorm mysql2 mongoose -w`
4. 新建 lib/comm/src/database/database.providers.ts,创建一个公共的ORM注入实例，需要在module中使用
5. 新建 database.module.ts

### 使用

从这一步开始都是基于 app/low-code-test 实际服务端项目

1. 创建user服务文件夹，见下各个相关文件
2. 最终文件夹下创建 user.module.ts，将 controller、providers、service 等都引入后，切记将 user.module.ts 导入 app.module.ts 后才会生效，这一步别忘记了 