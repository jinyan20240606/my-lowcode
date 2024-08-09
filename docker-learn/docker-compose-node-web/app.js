// 导入 Express 框架
const express = require('express');

// 创建 Express 应用实例
const app = express();

// 设置端口号
const port = process.env.PORT || 3000;

// 定义一个简单的路由
app.get('/', (req, res) => {
    res.send('你好,这是一个运行在Docker上的简单Node.js应用。');
});

// 启动服务器
app.listen(port, () => {
    console.log(`web 服务器启动了:  http://localhost:${port}`);
});