### 简介

这是一个基于nodejs,用于生成不同环境项目配置文件的小工具，比如：在开发环境、测试环境和生产环境生成节点相同但内容不同的配置文件，省去了手工修改配置内容的麻烦事。

### 依赖

- NodeJS
- npm

### 如何使用

1. 给操作系统添加环境变量标识（**XConfigENV**=DEV），以让本工具可以识别当前程序在哪个环境中。
2. 添加不同环境的模板配置文件：envTpl.json

		 {
		    "appSettings": {
		        "DEV": {
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
		    },
		    "connectionStrings": {
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




3. 添加XConfigGen配置文件：XConfigGen-Config.json
		
		{
		    "tpl": ".\\test\\envTpl.json",
		    "configs": {
		        "appSettings": {
		            "name": "appSettings配置信息",
		            "cfg": [
		                {
		                    "source": ".\\test\\appSettings.config.tpl",
		                    "target": ".\\test\\appSettings.config"
		                }
		            ]
		        },
		        "connectionStrings": {
		            "name": "connectionStrings配置信息",
		            "cfg": [
		                {
		                    "source": ".\\test\\connectionStrings.config.tpl",
		                    "target": ".\\test\\connectionStrings.config"
		                }
		            ]
		        }
		    }
		}


