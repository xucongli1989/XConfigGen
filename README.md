# 简介

这是一个用于生成不同环境项目配置文件的小工具，比如：在开发环境、测试环境和生产环境生成节点相同但内容不同的配置文件，省去了手工修改配置内容的麻烦事。

# 原理

使用自定义的数据源，用模板的方式来生成作用于不同环境的配置文件。比如，同一配置节点 `A`，在开发环境中，该值为 `Value1`；但在生产环境，其值为 `Value2`。因此，我们可以利用模板的方式来批量修改这样的配置节点内容。

# 如何使用

## 一、全局安装

```bash
npm i -g xconfiggen
```

## 二、添加环境变量

给当前系统添加一个环境变量，用来识别当前系统处于什么环境：`XConfigGenENV=DEV`

## 三、准备包含所有环境配置的 JSON 文件

> XConfigGen-Config.json

```json
{
  "configs": {
    "appSettings": {
      "name": "appSettings配置信息",
      "cfg": [
        {
          "source": "./appSettings.config.tpl",
          "target": "./appSettings.config"
        }
      ],
      "val": {
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
      }
    },
    "connectionStrings": {
      "name": "connectionStrings配置信息",
      "cfg": [
        {
          "source": "./connectionStrings.config.tpl",
          "target": "./connectionStrings.config"
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

```

## 四、准备各个配置的模板文件

> appSettings.config.tpl

```xml
<?xml version="1.0" encoding="utf-8" ?> 
<appSettings>
    <add key="HostUrl" value="${config.HostUrl}" />
    <add key="AppID" value="${config.AppID}" />
    <add key="SysEnvironment" value="${ENV}" />
</appSettings>
```

> connectionStrings.config.tpl

```xml
<?xml version="1.0" encoding="utf-8"?>
<connectionStrings>
  <add name="ConnectionString" connectionString="${config.connectionString}" providerName="System.Data.SqlClient" />
</connectionStrings>
```

## 五、开始运行

    xconfiggen --xconfig D:\test\XConfigGen-Config.json

运行后，我们会看到自动生成了两个新的配置文件，如下：

> appSettings.config

```xml
<?xml version="1.0" encoding="utf-8" ?> 
<appSettings>
    <add key="HostUrl" value="http://www.dev.com" />
    <add key="AppID" value="100" />
    <add key="SysEnvironment" value="DEV" />
</appSettings>
```

> connectionStrings.config

```xml
<?xml version="1.0" encoding="utf-8"?>
<connectionStrings>
  <add name="ConnectionString" connectionString="dev.db.com" providerName="System.Data.SqlClient" />
</connectionStrings>
```

## 注意

上述的配置文件与模板文件需要在同一目录层级中。