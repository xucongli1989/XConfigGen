:bat����Ŀ¼
set XConfigGenBatPath=%~dp0
:ִ��gulp����
gulp --gulpfile %XConfigGenPath% --xconfig  %XConfigGenBatPath%XConfigGen-Config.json --rootpath %XConfigGenBatPath%
pause