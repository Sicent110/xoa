@echo off
if not exist npm (
	echo ���Ƚ�ѹ ����ƽ̨.rar ����ǰĿ¼
	set /p xx=
	exit
)
npm\gulp deploy