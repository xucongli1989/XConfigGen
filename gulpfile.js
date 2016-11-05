#!/usr/bin/env node

var gulp = require('gulp');
var minimist = require('minimist');
var fs = require('fs');


var ENV = "PRD";
var options = minimist(process.argv.slice(2));


/**
 * 文件操作
 */
var f = {
    readFileSync: function (path) {
        path = path.replace(/^\.\\/, __dirname + '\\');
        return fs.readFileSync(path, 'utf-8');
    },
    writeFileSync: function (path, txt) {
        path = path.replace(/^\.\\/, __dirname + '\\');
        fs.writeFileSync(path, txt, 'utf-8');
    }
};




/**
 * 默认task
 */
var defaultTask = function () {

    console.log('开始执行XConfig配置任务...');

    if (!options.xconfig) {
        throw '必须提供XConfigGen配置文件路径！';
    }

    console.log('输入的xconfig参数为：' + options.xconfig);

    //获取XConfigGen配置信息
    console.log('正在获取XConfigGen配置信息...');
    var xconfigData = JSON.parse(f.readFileSync(options.xconfig));
    if (!xconfigData) {
        throw '请提供有效的XConfigGen配置文件信息！';
    }

    //获取环境模板
    console.log('正在获取环境模板...');
    var envData = JSON.parse(f.readFileSync(xconfigData.tpl));
    if (!envData) {
        throw `请提供有效的环境模板信息（${xconfigData.tpl}）！`;
    }

    Object.keys(xconfigData.configs).forEach(k => {

        var m = xconfigData.configs[k];
        console.log('正在处理：' + m.name);

        var tplObj = envData[k];
        if (!tplObj) {
            throw `请在主模板中配置【${k}】节点信息！`;
        }
        var config = tplObj[ENV];
        if (!config) {
            throw `主模板配置文件中必须要提供环境${ENV}的配置信息！`;
        }

        m.cfg.forEach(cf => {
            var content = f.readFileSync(cf.source);
            f.writeFileSync(cf.target, eval('`' + content + '`'))
            console.log(`文件已生成：${cf.target}。`);
        });


    });



};



gulp.task('default', function () {

    defaultTask.apply(this, arguments);

});

