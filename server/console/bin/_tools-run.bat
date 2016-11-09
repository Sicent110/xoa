@echo off

:start
cls
set clearDb=1
set buildDbWithMock=2
set buildDbOnly=3
set checkRequirements=4
set exit=x
echo.
echo  %clearDb%.������ݿ�
echo  %buildDbWithMock%.�������ݿ�+ģ�����ݣ�����ʱ�ã�
echo  %buildDbOnly%.���������ݿ�ı�Ҫ�ṹ�����ݣ����ϲ���ʱ�ã�
echo  %checkRequirements%.���Yii���֧�����
echo  %exit%.�˳�
echo.
echo.

set /p want=������ѡ�����֣�
set command=

if %want%==%clearDb% (
	set command=%~dp0\yii migrate/down all
)
if %want%==%buildDbWithMock% (
	set command=%~dp0\yii migrate/up all --mockData=1 --exportFile=@
)
if %want%==%buildDbOnly% (
	set command=%~dp0\yii migrate/up all
)
if %want%==%checkRequirements% (
	set command=php %~dp0\requirements.php
)
if %want%==%exit% (
	exit
)

%command%

echo ��Ȼ���в������һֱδ�ܽ���������
pause

echo .
if errorLevel 1 (
	set /p tmp = ִ��ʧ�ܣ��س�������һ��
) else (
	set /p tmp = ִ�гɹ����س�������һ��
)
goto start