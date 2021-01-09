#! /usr/bin/env node

const axios = require("axios");
const fs = require("fs");
const path = require("path");


const program = require('commander');

program
    .command('view [month] [day]')   //子命令:  view   可选参数:  month  day
    .action(function (month, day) {

       
        let mon;
        let da;

        if (month && day)//两个参数都存在
        {
             if (month <= 12 && day <= 31)//参数是否合格
            {
                mon = month;
                da = day;

            }//
            else//抛出异常
            {
                throw new Error("参数错误");
            }

        }//
        else//不是两个参数都存在
        {
            if (!month && !day)//两个参数都不存在(没有传参数)
            {
                //获取执行命令当天的日期
                mon = new Date().getMonth() + 1;
                da = new Date().getDate();
            }//
            else//只传了一个参数
            {
                if(month<=12)//
                {
                    mon = month;//使用传回的月份数
                    da = new Date().getDate();  //获取当天的日
                }//
                else//
                {
                    throw new Error("参数错误")
                }

            }

        };

        axios.get(`http://api.juheapi.com/japi/toh?key=70f6b825f8356b64c8dfb33438c0fdd1&v=1.0&month=${mon}&day=${da}`).then(text => {
          

            if (text.data.error_code == 0)//
            {
                fs.writeFileSync(path.join(process.cwd(), "./history.json"), JSON.stringify(text.data.result));

            }
            else//
            {
                throw new Error("请求失败!!");
            }

        })




    })

program.parse(process.argv)


 