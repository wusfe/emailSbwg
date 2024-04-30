module.exports = {
    em: {   // 邮箱配置
        service: 'qq',    // 在这里以QQ邮箱为例
        host: 'smtp.qq.com',
        port: 465, // SMTP 端口
        secure: true,
        secureConnection: true, // 使用 SSL
        auth: {
            user: '792475205@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'xngumessokjrbfdb'
        }
    },
    forUser: '792475205@qq.com',    // 接收邮箱地址
    webUrl: ""    // 网站地址
}
