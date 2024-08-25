# 服务端学习项目

> 参考 https://juejin.cn/book/6918979822425210891/section/7220043907789226016?enter_from=course_center&utm_source=course_center
> github代码仓库 https://github.com/Ignition-Space/ignition/blob/main/apps/userServer/src/user/user.module.ts

## 学习docker入门

> 见docker-learn目录

## nest使用经验

### 包积累

1. class-validator：数据验证包，一般配合dto对象做的
2. @nestjs/passport: 兼容nest的passport中间件
3. passport: [官网](https://juejin.cn/post/6931618922005266445) Node.js的封装jwt等方案的登陆验证鉴权的中间件，可与Express兼容

### 使用

1. 一个子应用下写了多个模块如user应用下的user模块和department模块，两个模块互相调用service方法的话，不用在各自模块中单独引入service进行注册，而是直接利用模块的exports导出就可以
    - 当别人引用这个模块时会自动注册其导出的方法

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

- 安装`pnpm add @nestjs/config -w` 包
- 修改app.module.ts
    - `import { ConfigModule } from '@nestjs/config';`
- 业务文件处直接引用ConfigService获取环境变量对象
    - `import { ConfigService } from '@nestjs/config';`
- 新增.env文件

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
- typeorm
    - 实体表里设置的多对一关系字段，并不会体现在实际的表常规字段里，只是个虚拟标记
        - 当查询用户所有数据时，带上关联标记参数时，这时返回的用户每条数据会带上department字段及对应部门表的值
    - **表关联**：关联表所属数据展现都是typeorm框架自动做的只需要配置两方的映射字段和create多方数据时手动增加映射字段的值告诉框架去内部映射即可，所属映射的字段和值不会在数据库实体表里呈现，只会在实时查询展示给用户，
        - 如部门和用户关联表，部门表里没有显示增加字段，用户表数据库里会每条数据显示增加对应所属的department_id字段，但普通查询数据库时不会返回给前端

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

## 16、Mysql数据库实操+微服务创建

### 创建user微服务

不是前一节的将user服务直接写在my-lowcode服务里，而是将user抽出来一个子应用作为微服务

前一节的my-lowcode/src下的user子模块 就可以删了不用了，直接用微独立服务

1. 输入生成微服务的指令 `nest generate app user`
    - 就是新增一个monorepo下的子独立服务应用
2. 为了兼容给 MnnoRepo，app/user 目录下新增虚拟 package.json 文件
3. 用以下脚本创建 curd 的 user 模块`nest g resource user1 --project devops`
    - 命令来在指定项目子应用下创建一个crud模板目录
    - user1是新子模块名称及文件夹名字
    - devops在app下的devops子应用中创建


### 基础操作

1. 增
2. 查：修改user.service.ts
3. 删
4. 改

### 一对多

增加部门表和用户表 ，表关联概念。当前用户属于哪个部门

1. 先创建 User 的模式，创建一个 Department CRUD 模块
    - `nest g resource department --project user`
2. 修改 uer/user.service.ts 中 create 方法，添加查询部门以及添加的关系逻辑
3. 修改 department/department.service.ts 的 findAll 方法，添加 relations 筛选关联关系

## 17、MongoDB数据库实操

本节开始就着重开始低代码相关的服务搭建了

目前低代码项目my-lowcode使用mongoDB，用户微服务中使用mysql。

这节应该是针对低代码项目进行操作了

### 低代码搭建选择mongo不是mysql的选型原因，及两者对比介绍

### 配置

1. 低代码应用下创建3个子模块：Site、Page、PageConfig。里面的User模块不用了，只是留着用个练习demo。暂时注释User模块的引用即可
2. 将pageConfig合并到page模块里，合并为一个Controller，因为pageConfig和page依赖性比较强
```javascript
nest g resource site --project my-lowcode
nest g resource page --project my-lowcode
nest g resource pageConfig --project my-lowcode
```

### 基础操作

#### 增

1. 创建对应的实体类
2. 看各种文件

#### 查

修改 site.controller.ts 的 findOne 方法

看相关文件

## 18、数据库TypeORM实操进阶

> 将以 MySQL 作为 Demo 数据库来学习一下 TypeORM 常见的一些高阶用法

### 多个数据源

#### 多链接&多数据库

就是之前封装那个libs/comm/database的mongoDB与mysql同时用这个功能，根据不同文件后缀名注册实体类
因为typeorm初始化时需要指定文件后缀正则匹配加载对应的实体文件

实现多链接的多数据库,就是多次初始化DataSource，初始化2个实例分别链接两个数据库

更好的办法其实是用TypeORM的createConnection方法

#### 单链接&多数据库

除了多连接之外，TypeORM 也支持使用单链接 & 多数据模式，在这个模式中只需要建立一次链接就可以使用多个数据库

1. 们指定了 databases 属性，它包含了一个数据库名的数组。这样，TypeORM 就知道这个连接可以用于多个数据库
2. 当您定义实体时，可以指定该实体属于哪个数据库
    - `@Entity({ database: 'database1' }) // 指定实体属于哪个数据库`

#### 主从复制

TypeORM也支持MySQL的主从复制

### Find进阶

请启动我们的 User 服务来体验下述例子

#### Select

有时并不需要将所有的数据都返回给前端，可以使用 Select 参数来过滤一些我们不想显示的字段

1. 修改/user/user.service.ts 修改 findAll 查询数据库方法
2. 增加select方法，仅筛选id，username的字段和关联字段进行输出

#### Not

1. /user/user.controller.ts 新建 findNotOne 方法:

### QueryBuilder

- QueryBuilder 是 TypeORM 最强大的功能之一 ，它允许你使用优雅便捷的语法构建 SQL 查询，执行并获得自动转换的实体
    - 果当你的条件判断复杂度上升到常规方法不支持的时候，除了手写 Sql 之外，QueryBuilder 也是一个非常好的选择
- 创建 QueryBuilder 的方法有多种：
    - connection
    - entity manager
    - repository
    对于我们封装好的工具类选择第三种 repository 的方式是最为简便的
- 该方法对比直接手写SQL还是简便的

### 查询缓存

数据库查询是非常消耗资源，不需要实时性的话可以采用缓存减少查询频率

可以利用TypeORM提供的缓存能力

1. QueryBuilder：缓存方法
2. Repository：的缓存方法

## 19、开发CICD的CLI

开发一款服务于cicd的cli

设计2个独立模块，一个是ig-base-cli基础cicd，和ig-build-cli构建的cli，实现功能收敛

源码参考：https://github.com/Ignition-Space/ig-base-cli

### 开发自定义注册CLI命令行插件功能


### 仿gitlabciyaml流程编排

## 20、用户服务开发（上）

进行了一系列服务端的基础训练之后，本章将迎来第一个服务端实战项目：用户系统。

### 准备工作

#### 配置测试域名

> 能通过本地测试域名正常访问对应的前后端项目即可

1. 修改本地 host 文件的 DNS 解析
```js
// HOSTS文件只能设置ip的映射不能设置端口映射，端口映射还得借助nginx
127.0.0.1 wwww.lowcode.com
127.0.0.1 api.lowcode.com
```
2. 使用nginx配置服务端的反向代理和端口转发，使本地host域名能访问到本地localhost项目.2者缺一不可

#### 配置github授权

> 可以详细参考：https://juejin.cn/post/6998348587797053447

### 用户授权登录

#### GITHUB授权

我们将完全按照之前的表结构来开发用户系统，为了方便各位操作，用户的三方登录将以 Github 授权来作为演示。

1. 授权拼接测试地址：https://github.com/login/oauth/authorize?client_id=Iv23likJ1IcdXjDpYc8e
    - 这个会回调携带code的自己定义的api链接

#### token方案：jwt

登录token的方案有很多种，选择jwt方案

1. `npm install @nestjs/passport passport`
2. 新建 /src/auth/strategies 目录，添加 oauth.strategy.ts 与 jwt-auth.strategy.ts 两个文件---- 2个通行策略执行
    - GithubStrategy 策略： 根据 passport 提供的方法，调用 authService 中的 validateFeishuUser 方法，从 Github 获取对应的用户信息。
        - 安装`passport-custom` 来自定义passport策略支持github的oauth认证
    - JwtStrategy策略： 则是使用 passport-jwt拓展的功能，对 cookie 做了拦截、解密等功能
        - 安装`passport-jwt`使用其jwt策略插件
3. 重写之前oauth授权方法

#### 大体流程

1. 之前github授权那节在auth.controller路由方法时是直接用code调用的获取github用户信息然后更新数据库，直接返回就是最新的user信息
2. 在加入jwt方案后:
    - auth.controller中前置加入**路由守卫**，验证后才执行下一步
        - 路由守卫直接用的passport提供的方法，自动调用定义的oauth.strategy策略验证方法
        - 将code获取github用户信息的流程移到了这个自定义的策略中执行
    - 验证通过后执行controller方法的参数自定义装饰器@PayloadUser方法
        - 上一步守卫中间件逻辑中会将github用户信息对象默认附加到request的user属性中
    - 继续调用auth.service的login方法
        - login方法就是用jwt对拿到的user信息加密后生成个access_token，然后返回给前端保存
    - 处理token
        - 用respose.cookie方法将token种在客户端cookie下保存，返回前端
        - 接口响应cookie不会立即在当前接口响应后看到，可以通过检查响应头setcookie或刷新页面浏览器才会显示
3. 上面就是github授权，授权后利用其user信息生成jwt-token返回前端种植完整链路
4. 下面最后还需要将JwtAuthGuard守卫 在用户中心服务上设置为全局守卫做关口身份校验，自动对cookie中携带的token做解密验证
    - `import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';`这俩方法用来注册**全局守卫**
TODO。。。https://github.com/Ignition-Space/ignition/blob/e3c2387186e03b17bf901c89244549c6a00c1706/apps/userServer/src/user-center.module.ts#L10。