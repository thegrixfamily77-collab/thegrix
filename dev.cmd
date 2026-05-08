@echo off
setlocal
cd /d "%~dp0"
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm.cmd not found in PATH.
  pause
  exit /b 1
)
echo The Grix — http://localhost:3000
call npm.cmd run dev
