var minimist = require('minimist');
var fs = require('fs');
var options = minimist(process.argv.slice(2));//命令行参数

var XCONFIG_PATH = String.raw`${options.xconfig || ''}`;//XConfigGen配置文件所在路径
var PATH = String.raw`${options.rootpath || ''}`;//待处理的配置文件所在根路径
var ROOT_PATH = PATH.replace(/\\/g, '\\\\');//将PATH中的\替换为\\

/**
 * 获取当前系统环境
 */
var ENV = (process.env['XConfigGenENV'] || '').toUpperCase();
if (!ENV) {
    throw '请配置系统环境变量【XConfigGenENV】，如：DEV/FAT/PRD！';
}
console.log(`当前所在系统环境为：【${ENV}】！`);


/**
 * 验证是否已输入配置文件路径
 */
if (!XCONFIG_PATH) {
    throw '请提供XConfigGen的配置文件路径！';
}
console.log(`XConfigGen的配置文件路为：${XCONFIG_PATH}`);


/**
 * 公共方法
 */
var lib = {
    readFileSync: function (path) {
        path = path.replace(/^\.\\/, __dirname + '\\');
        return fs.readFileSync(path, 'utf-8');
    },
    writeFileSync: function (path, txt) {
        path = path.replace(/^\.\\/, __dirname + '\\');
        fs.writeFileSync(path, txt, 'utf-8');
    }
};

console.log('开始执行配置任务...');
console.log('正在读取XConfigGen配置信息...');

var xconfigContent = lib.readFileSync(XCONFIG_PATH);
xconfigContent = eval('`' + xconfigContent + '`');
console.log(xconfigContent);

var xconfigData = JSON.parse(xconfigContent);
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
        var content = lib.readFileSync(cf.source);
        lib.writeFileSync(cf.target, eval('`' + content + '`'));
        console.log(`文件已生成：${cf.target}。`);
    });
});