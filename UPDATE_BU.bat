cd C:\dcs
sqlite3 nns2018.db .schema > schema.sql
sqlite3 nns2018.db .dump > dump.sql
grep -vx -f schema.sql dump.sql > data.sql
:::                / \/ \,'| _ 
:::               ,'    '  ,' |,| 
:::              ,'           ' |,'| 
:::             ,'                 ;'| _ 
:::            ,'                    '' | 
:::           ,'                        ;-, 
:::          (___                        / 
:::        ,'    `.  ___               ,' 
:::       :       ,`'   `-.           / 
:::       |-._ o /         \         / 
:::      (    `-(           )       / 
:::     ,'`.     \      o  /      ,' 
:::    /    `     `.     ,'      / 
:::   (             `"""'       / 
:::    `._                     / 
:::       `--.______        '"`. 	Update Complete!
:::         \__,__,`---._   '`; 
:::               ))`-^--')`,-' 
:::             ,',_____,'  | 
:::             \_          `). 
:::              `.      _,'  ` 
:::              /`-._,-'      \ 

for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A

pause