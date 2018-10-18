cd C:\dcs
sqlite3.exe nns2018.db "update localarea_listings set address='GALS COMPOUND' where eacode='072230026021' and hcn='0045' and shsn='0048'; update localarea_listings set address='GALS COMPOUND' where eacode='072230026021' and hcn='0006' and shsn='9999'; update localarea_listings set address='GALS COMPOUND' where eacode='072230026021' and hcn='0082' and shsn='0083'; update localarea_listings set address='GALS COMPOUND' where eacode='072230026021' and hcn='0054' and shsn='0057';  "

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