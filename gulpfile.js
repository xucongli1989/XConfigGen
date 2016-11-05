#!/usr/bin/env node

var gulp = require('gulp');
var minimist = require('minimist');
var fs = require('fs');
var options = minimist(process.argv.slice(2));//命令行参数

/**
 * 获取当前系统环境
 */
var ENV = (process.env['XConfigGenENV'] || '').toUpperCase();
if (!ENV) {
    throw '请配置系统环境变量【XConfigGenENV】，如：DEV/FAT/PRD！';
}
console.log(`当前所在系统环境为：【${ENV}】！`);

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

    console.log('正在读取XConfigGen配置信息...');
    var xconfigData = JSON.parse(f.readFileSync(options.xconfig));
    if (!xconfigData) {
        throw '请提供有效的XConfigGen配置文件信息！';
    }

    Object.keys(xconfigData.configs).forEach(k => {
        var m = xconfigData.configs[k];
        console.log('正在处理：' + m.name);

        var config = m.val[ENV];
        if (!config) {
            throw `配置文件中必须要提供【${m.name}】在环境【${ENV}】的配置信息！`;
        }

        m.cfg.forEach(cf => {
            var content = f.readFileSync(cf.source);
            f.writeFileSync(cf.target, eval('`' + content + '`'));
            console.log(`文件已生成：${cf.target}。`);
        });
    });
};

gulp.task('default', function () {
    defaultTask.apply(this, arguments);
});