/* eslint-disable @typescript-eslint/dot-notation */
import minimist from "minimist"
import fs from "fs"
import path from "path"
import Mustache from "mustache"
import { ConfigDataType } from "./type"

const options = minimist(process.argv.slice(2)) //命令行参数
const XCONFIG_PATH = String.raw`${options.xconfig || ""}` //XConfigGen配置文件所在路径
const XCONFIG_DIR_PATH = path.dirname(XCONFIG_PATH)
const ENV = (process.env["XConfigGenENV"] || "").toUpperCase()

/**
 * 默认禁用 Mustache 转义
 */
Mustache.escape = (text) => text

/**
 * 获取当前系统环境
 */
if (!ENV) {
    throw new Error("请配置系统环境变量【XConfigGenENV】，如：DEV、FAT、PRD！")
}
console.log(`当前所在系统环境为：${ENV}`)

/**
 * 验证是否已输入配置文件路径
 */
if (!XCONFIG_PATH || !fs.existsSync(XCONFIG_PATH)) {
    throw new Error("配置文件 JSON 数据源不存在！")
}
console.log(`当前配置数据源路径是：${XCONFIG_PATH}`)

/**
 * 公共方法
 */
const lib = {
    readFileSync: (p: string) => {
        const s = path.resolve(XCONFIG_DIR_PATH, p)
        if (!fs.existsSync(s)) {
            throw new Error(`文件不存在：${s}`)
        }
        return fs.readFileSync(s, "utf-8")
    },
    writeFileSync: (p: string, txt: string) => {
        fs.writeFileSync(path.resolve(XCONFIG_DIR_PATH, p), txt, "utf-8")
    }
}

const xconfigContent = lib.readFileSync(XCONFIG_PATH)
console.log("当前配置数据源内容是：", xconfigContent)
const xconfigData: ConfigDataType = JSON.parse(xconfigContent)

Object.keys(xconfigData.configs).forEach((k) => {
    const m = xconfigData.configs[k]
    console.log("正在处理：" + m.name)

    const config = m.val[ENV]
    if (!config) {
        throw new Error(`数据源中必须要提供【${m.name}】在环境【${ENV}】的配置信息！`)
    }

    m.cfg.forEach((cf) => {
        const template = lib.readFileSync(cf.source)
        const content: string = Mustache.render(template, {
            ENV,
            config
        })
        lib.writeFileSync(cf.target, content)
        console.log(`文件已生成：${cf.target}。`)
    })
})
