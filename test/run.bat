:bat所在目录
set XConfigGenBatPath=%~dp0
:执行node命令
node %XConfigGenPath% --xconfig  %XConfigGenBatPath%XConfigGen-Config.json --rootpath %XConfigGenBatPath%
:pause