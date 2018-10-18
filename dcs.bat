del c:\dcs\consolidation\*.* /s /q
del c:\dcs\uploads\*.* /s /q
xcopy /n C:\dcs\nns2018.db Z:\ /Y
ren Z:\nns2018.db nns2018_%date:~10,4%%date:~7,2%%date:~4,2%_%time:~0,2%%time:~3,2%.db
ren Z:\nns2018.db nns2018_%date:~10,4%%date:~7,2%%date:~4,2%_%time:~1,1%%time:~3,2%.db
xcopy /n C:\dcs\nns2018.db D:\ /Y
ren D:\nns2018.db nns2018_%date:~10,4%%date:~7,2%%date:~4,2%_%time:~0,2%%time:~3,2%.db
ren D:\nns2018.db nns2018_%date:~10,4%%date:~7,2%%date:~4,2%_%time:~1,1%%time:~3,2%.db
cd C:\
cd dcs
start http://localhost:3000
npm run dev
pause