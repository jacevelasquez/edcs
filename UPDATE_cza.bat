cd C:\dcs
sqlite3.exe nns2018.db "delete from f11 where eacode='112402074028' and hcn='0232' and shsn='0229' and MEMBER_CODE='03';    delete from f21 where eacode='112402074028' and hcn='0232' and shsn='0229' and MEMBER_CODE='03';  delete from f11 where eacode='112402074028' and hcn='0232' and shsn='0229' and MEMBER_CODE='04';  delete from f21 where eacode='112402074028' and hcn='0232' and shsn='0229' and MEMBER_CODE='04';   "

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