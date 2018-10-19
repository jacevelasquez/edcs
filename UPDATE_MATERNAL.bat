cd C:\dcs
sqlite3.exe nns2018.db "CREATE UNIQUE INDEX if not exists `answers unique` ON `answers` (`answer_value`,`variable_name`); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999991,'f31_75','f31_75_07','Before feeding (name of child)<br>Bago pakainin si (pangalan ng bata)','','header',''); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999992,'f31_75','f31_75_08','Never','0','radio',''); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999993,'f31_75','f31_75_08','Rarely','1','radio',''); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999994,'f31_75','f31_75_08','Sometimes','2','radio',''); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999995,'f31_75','f31_75_08','Often','3','radio',''); INSERT or ignore INTO `answers` (row_id,qkey,variable_name,answer_text,answer_value,input_type,skip) VALUES (999996,'f31_75','f31_75_08','Always','4','radio',''); ALTER table f31 add column f31_75_08 varchar(50);"

:::
:::          $$$$$$$$$$$
:::        $$$$$$$$$$$$$$$                           $$
:::      $$$$$$$$$$$$$$$$$$    @@@`````````",       $$$$
:::      $$$$$$$$$$$$$$$$$$ @@@@ @           `,     $ $$
:::       $$$$$$$$$$$$$$$$@@@@            \~~\ ",   ,$$",
:::        $$$$$$$$$$$$$$$@@       /~~\    \@@ \ ","     :
:::          $$$$$$$$$$$@@@@       \    \   \@@","       :
:::                    @@@@@@@       \@@@ \   ,"         :
:::                    @@@@@@@@@@@@@  \@@@//  "         :
:::                     @@@@@@@@                       :
:::                      @@@@@@   __                  :
:::                       @@@@   /\                  /
:::            $$$$$$$$$$$$ @@@    \\______________/|
:::          $$$$$$$$$$$$$$$$@@     \ __         / /
:::        $$$$$$$$$$$$$$$$$$$@\,     \  \---\,/ /
:::        $$$$$$$$$$$$$$$$$$$   ~",    \_____/ /  UPDATE COMPLETE!
:::         $$$$$$$$$$$$$$$$$       ",,,,,,,,,/		     -Jc
:::          $$$$$$$$$$$$$$$
:::            $$$$$$$$$$$'
:::
for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A

pause