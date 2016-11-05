## 简介

这是一个基于nodejs，用于生成不同环境项目配置文件的小工具，比如：在开发环境、测试环境和生产环境生成节点相同但内容不同的配置文件，省去了手工修改配置内容的麻烦事。

## 环境准备

- NodeJS
- npm
- gulp

## 原理

使用自定义的数据源，用模板的方式来生成作用于不同环境的配置文件。比如，同一配置节点A，在开发时，该值为Value1；但当发布至生产环境后，其值可能为Value2。因为，我们可以利用模板的方式来批量修改这样的配置节点内容。

## 如何使用

### 一、添加环境变量

- 当前系统所在环境：**XConfigENV=DEV**
- XConfigGen程序入口：**XConfigGenPath=D:\MyData\MyGit\GitHub\XConfigGen\gulpfile.js**

### 二、添加配置文件

提示：使用时请去掉json中的注释信息，否则在json转换中可能出错！

		{
		    "configs": {
		        "appSettings": {//自定义的配置名称
		            "name": "appSettings配置信息",
		            "cfg": [
		                {
		                    "source": ".\\test\\appSettings.config.tpl",//配置文件模板路径
		                    "target": ".\\test\\appSettings.config"//最终生成的配置文件路径
		                }
		            ],
		            "val": {
		                "DEV": {//所在环境名称，也就是XConfigENV的值对应的配置信息
		                    "HostUrl": "http://www.dev.com",
		                    "AppID": "100",
		                    "Name": "这是开发环境"
		                },
		                "FAT": {
		                    "HostUrl": "http://www.fat.com",
		                    "AppID": "101",
		                    "Name": "这是测试环境"
		                },
		                "UAT": {
		                    "HostUrl": "http://www.uat.com",
		                    "AppID": "102",
		                    "Name": "这是仿真环境"
		                },
		                "PRD": {
		                    "HostUrl": "http://www.prd.com",
		                    "AppID": "103",
		                    "Name": "这是生产环境"
		                }
		            }
		        },
		        "connectionStrings": {
		            "name": "connectionStrings配置信息",
		            "cfg": [
		                {
		                    "source": ".\\test\\connectionStrings.config.tpl",
		                    "target": ".\\test\\connectionStrings.config"
		                }
		            ],
		            "val": {
		                "DEV": {
		                    "connectionString": "dev.db.com"
		                },
		                "FAT": {
		                    "connectionString": "fat.db.com"
		                },
		                "UAT": {
		                    "connectionString": "uat.db.com"
		                },
		                "PRD": {
		                    "connectionString": "prd.db.com"
		                }
		            }
		        }
		    }
		}




### 三、开始运行

    	gulp --gulpfile %XConfigGenPath% --xconfig  ".\\test\\XConfigGen-Config.json"

	
参数说明：--xconfig 内容为XConfigGen的配置文件路径

注：可以在Visual Studio的生成事件中加入此命令（或bat）来自动生成您的配置文件。


## 示例截图

![](https://raw.githubusercontent.com/xucongli1989/XConfigGen/master/imgs/1.jpg)


![](https://raw.githubusercontent.com/xucongli1989/XConfigGen/master/imgs/2.jpg)

