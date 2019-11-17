@ECHO OFF
cd /d %~dp0
rmdir /s release
mkdir release
mkdir release\#YogWbScoreTools

COPY /B README.md release\#YogWbScoreTools
COPY /B screen_shot.jpg release\#YogWbScoreTools
COPY /B LICENSE release\#YogWbScoreTools
COPY /B LICENSE release\#YogWbScoreTools
COPY /B application\YogWbScoreTools.htm release\#YogWbScoreTools
COPY /B application\YogWbScoreTools.js release\#YogWbScoreTools
