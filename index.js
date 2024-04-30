const schedule = require("node-schedule");
const nodemailer = require('nodemailer');
const config = require('./config');
const request = require('request');
let webStatusCode = '';
let webStatusMsg = '';


let j = schedule.scheduleJob('30 * * * * *', function(a,b,c){
    console.log(a, b, c)

    request({
        url: 'https://pw.hbww.org.cn/api/ticket/calendar?p=w',
        method:"get",
        json: true,
        headers: {
            "content-type": "application/json",
        }
    },(error, response, body)=>{
        // console.log(JSON.stringify(response))
       let subject = ''
       let replyStr = ''
       if(response.statusCode === 200){
        if(response.body.status === 1){
            // console.log(response.body.data)
    
            const dataArr = ['2024-05-01','2024-05-02','2024-05-03','2024-05-04','2024-05-05']
            const data = response.body.data.yy_date.filter(item => dataArr.includes(item.t_date))
            subject = '五一期间 省博物馆 票计：'
             replyStr = `
            <table border=1>
                <thead>
                    <th>${dataArr[0]}</th>
                    <th>${dataArr[1]}</th>
                    <th>${dataArr[2]}</th>
                    <th>${dataArr[3]}</th>
                    <th>${dataArr[4]}</th>
                </thead>
    
                <tbody>
                    <tr>
                        <td>${data[0].tp_last_stock_sum} </td>
                        <td>${data[1].tp_last_stock_sum} </td>
                        <td>${data[2].tp_last_stock_sum} </td>
                        <td>${data[3].tp_last_stock_sum} </td>
                        <td>${data[4].tp_last_stock_sum} </td>
                            
                    </tr>
                
                </tbody>
            </table>
            
            `
    
            
          
    
        }else {
            subject = '统计失败'

            replyStr = `response.body.status: ${response.body.status}`
        }
       }else {
      

        subject = '统计失败'

            replyStr = `response.statusCode: ${response.statusCode}`
       }

       nodemailer.createTestAccount((err,account)=>{
        let transporter = nodemailer.createTransport(config.em);
         // 配置内容
         let mailOptions = {
            from: config.em.auth.user, // 发件人地址
            to: `${config.forUser}`, //收件人
            subject: subject, // 主题
            html: replyStr + '<br>' + '网站地址：<a  href="https://pw.hbww.org.cn/personal/index">https://pw.hbww.org.cn/personal/index </a> '
        };
        // 发送
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log('发送失败');
            }else {
                console.log('发送成功');
            }
        })
    })

    })

   
   
});