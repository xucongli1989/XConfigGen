/**
 * 配置文件
 */
export interface CfgItemType {
  /**
   * 模板文件路径
   */
  source: string
  /**
   * 生成后的实际文件路径
   */
  target: string
}

export interface ConfigDataItemType {
  /**
   * 名称
   */
  name: string
  /**
   * 配置文件模板和目标配置文件
   */
  cfg: CfgItemType[]
  /**
   * 具体的配置值
   */
  val: { [env: string]: Record<string, string> }
}

/**
 * 整个配置
 */
export interface ConfigDataType {
  /**
   * 所有配置列表
   */
  configs: Record<string, ConfigDataItemType>
}
