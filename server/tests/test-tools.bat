@echo off
goto navi
set unitTestName=
pause
exit
:navi
cls
echo.
echo.
echo   hi,�������С������Ϊ������������ֶ��������������Ŷ^^^-^^
echo.
echo.  ��������������������������������������������
echo.  ��              ����С����                ��
echo.  �ǩ�����������������������������������������
echo.  ��  1.���е�Ԫ����                        ��
echo.  ��  2.����ȫ������                        ��
echo.  ��  3.������Ԫ��������                    ��
echo.  ��  4.�������ղ�������                    ��
echo.  ��  5.�������ղ���(������,ûд��ű�)     ��
echo.  ��                                        ��
echo.  ��  x.�˳�                                ��
echo.  ��������������������������������������������
echo.

set menuId=0
set /p menuId=������˵����:

if "%menuId%"=="x" (exit)
if %menuId%==1 goto runUnitTest
if %menuId%==2 goto runAllTest
if %menuId%==3 goto createUnitTest
if %menuId%==4 goto createCeptTest
goto navi

::=============���е�Ԫ����s=================
:runUnitTest
echo.
echo.  ��������������������������������������������
echo.  ��              ��Ԫ����ѡ��              ��
echo.  �ǩ�����������������������������������������
echo.  ��  1.����ȫ����Ԫ��Ԫ����                ��
echo.  ��  2.����ָ����������                    ��
echo.  ��  3.����ָ������������ָ������          ��
echo.  ��                                        ��
echo.  ��  -.(����)������һ��                    ��
echo.  ��  x.�˳�                                ��
echo.  ��������������������������������������������
echo.

set unitMenuId=0
set /p unitMenuId=������˵����:
if "%unitMenuId%"=="-" (
    goto navi
)

if "%unitMenuId%"=="x" exit
if %unitMenuId%==1 (
    cls
    %codecept% run unit
    echo.
    echo ==============������ ȫ����Ԫ���� �Ĳ��Խ������=================
    goto runUnitTest
)
if %unitMenuId%==2 (
goto runSomeUnitTest)
goto runUnitTest
::=============���е�Ԫ����e=================


::=============�������в���s=================
:runAllTest
cls
%codecept% run
echo.
echo ==============������ ȫ������ �Ĳ��Խ������=================
goto navi
::=============�������в���e=================


::=============����ָ����Ԫ��������s=================
:runSomeUnitTest
echo.

set someUnitTestMenuId=0
if "%unitTestName%"=="" (
    cls
    goto readyToRunSomeUnitTest
) else (
    echo.  ��������������������������������������������
    echo.  ��          ����ָ����Ԫ��������          ��
    echo.  �ǩ���������������������������������������
    echo.  ��  1.������һ�� %unitTestName% �Ĳ���
    echo.  ��  2.�����������Ʋ�����                  
    echo.  ��                                        
    echo.  ��  -.�����ţ�������һ��                  
    echo.  ��  x.�˳�                                
    echo.  ��������������������������������������������

    set /p someUnitTestMenuId=������˵����:
)
if "%someUnitTestMenuId%"=="x" exit
if %someUnitTestMenuId%==1 (
    cls
    %codecept% run unit %unitTestName%
    goto runSomeUnitTest
)

if %someUnitTestMenuId%==2 (
cls
:readyToRunSomeUnitTest
    echo ���������������������,�����������Ŀ¼,���� model\ModelDbTest
    echo ����-�����ţ�������һ��
    ::echo ����֮ǰ��%unitTestName%
    set unitTestName=211111
    set /p unitTestName=
    ::echo ����֮����%unitTestName%
    pause
    if "%unitTestName%"=="x" exit
    if "%unitTestName%"=="-" (
        set unitTestName=
        goto runUnitTest
    )
    
    if %unitTestName%=="" (
        echo ��û�������������������
        goto runSomeUnitTest
    )
    %codecept% run unit %unitTestName%
    echo.
    echo ====������ ��Ԫ�������� %unitTestName% �Ĳ��Խ������====
    goto runSomeUnitTest
)

goto runSomeUnitTest
::=============����ָ����Ԫ��������e=================

::=============������Ԫ��������s=================
:createUnitTest
cls
echo.
echo  ׼��������Ԫ��������
echo  ���� User ����unitĿ¼�²��� UserTest.php
echo  ���Ҫ����,ֱ����ǰ���Ŀ¼,�� product/Phone ,��ǰ��product���ֻᱻ������ӦĿ¼
echo  -.������һ��
echo.
set /p unitTestName=�������������������:
if "%unitTestName%"=="" (
	goto createUnitTest
)
if %unitTestName%==x goto navi
%codecept% generate:test unit %unitTestName%
pause
goto navi
::=============������Ԫ��������e=================


::=============�������ղ�������s=================
:createCeptTest
cls
echo.
echo  ׼���������ղ�������
echo  ���� Login ����acceptanceĿ¼�²��� LoginCept.php
echo  ���Ҫ����,ֱ����ǰ���Ŀ¼,�� product/Detail ,��ǰ��product���ֻᱻ������ӦĿ¼
echo  -.������һ��
echo.
set /p ceptTestName=�������������������:
if "%ceptTestName%"=="" (
	goto createCeptTest
)
if %ceptTestName%==x goto navi
%codecept% generate:cept acceptance %ceptTestName%
pause
goto navi
::=============�������ղ�������e=================