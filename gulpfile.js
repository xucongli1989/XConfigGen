#!/usr/bin/env node

var gulp = require('gulp');
var minimist = require('minimist');
var fs = require('fs');


var ENV = "PRD";
var options = minimist(process.argv.slice(2));


var cfgs = [{
    "name": "appSettings配置信息",
    "tpl": "D:\\MyData\\MyGit\\GitHub\\XConfigGen\\test\\xconfig.json",
    "cfg": [{
        "path": "D:\\MyData\\MyGit\\GitHub\\XConfigGen\\test\\appSettings.config.tpl",
        "out": "D:\\MyData\\MyGit\\GitHub\\XConfigGen\\test\\appSettings.config"
    }]
}];


gulp.task('default', function() {

    console.log('开始执行XConfig配置任务');

    if (!options.configs) {
        throw '必须提供配置参数：configs';
    }

    var data = (function() {
        try {
            return JSON.parse(options.configs)
        } catch (e) {
            return null;
        }
    })();
    if (!data) {
        throw 'configs参数必须为json格式！';
    }

    data = cfgs;


    data.forEach(m => {

        console.log('正在处理：' + m.name);

        if (!m.tpl) {
            throw '必须指定tpl参数！';
        }
        if (!m.cfg || m.cfg.length == 0) {
            throw '必须指定cfg参数！';
        }

        //读取tpl
        var tplObj = null;
        fs.readFile(m.tpl, function(err, d) {
            tplObj = JSON.parse(d.toString());

            if (!tplObj) {
                throw '请指定有效的主模板内容！';
            }


            if (!tplObj.hasOwnProperty(ENV)) {
                throw `主模板配置文件中必须要提供环境${ENV}的配置信息！`;
            }


            //each cfg 


        });







    });















    console.log(options);

});

