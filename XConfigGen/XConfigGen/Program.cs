using RazorEngine;
using RazorEngine.Templating;
using System;
using System.Collections.Generic;
using System.Xml;

namespace XConfigGen
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string configPath = string.Format(@"{0}\Config\config.tpl", System.Environment.CurrentDirectory);
            string currentEnv = "DEV";

            #region 解析主配置文件

            XmlDocument config = new XmlDocument();
            config.Load(configPath);
            var envNodes = config.SelectNodes(string.Format("/XConfig/EnvironmentList/Environment/text()"));
            if (null == envNodes || envNodes.Count == 0)
            {
                throw new Exception("配置模板中必须配置EnvironmentList节点信息！");
            }

            bool hasEnv = false;
            foreach (XmlNode m in envNodes)
            {
                if (string.Equals((m.Value ?? "").Trim(), currentEnv, StringComparison.OrdinalIgnoreCase))
                {
                    hasEnv = true;
                    break;
                }
            }
            if (!hasEnv)
            {
                throw new Exception(string.Format("配置模板的EnvironmentList节点中找不到当前环境：{0}！", currentEnv));
            }

            var currentConfigNodes = config.SelectNodes(string.Format("/XConfig/{0}/*", currentEnv));
            if (null == currentConfigNodes || currentConfigNodes.Count == 0)
            {
                throw new Exception(string.Format("配置模板中必须存在环境【{0}】的配置信息！", currentEnv));
            }

            #endregion 解析主配置文件

            #region 渲染配置文件模板

            var dic = new Dictionary<string, object>();
            foreach (XmlNode m in currentConfigNodes)
            {
                dic.Add(m.Name, (m.InnerText ?? "").Trim());
            }

            var model = new DynamicViewBag(dic);
            string templatePath = string.Format(@"{0}\Config\appSettings.config.tpl", System.Environment.CurrentDirectory);
            var result = Engine.Razor.RunCompile(System.IO.File.ReadAllText(templatePath), "templateKey", null, model);

            if (string.IsNullOrWhiteSpace(result))
            {
                throw new Exception("渲染后的配置文件内容不能为空！");
            }

            #endregion 渲染配置文件模板

            #region 保存配置文件

            //ssssss

            #endregion 保存配置文件

            Console.ReadKey();
        }
    }
}