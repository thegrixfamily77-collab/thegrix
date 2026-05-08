@echo off
setlocal
cd /d "%~dp0"
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm.cmd not found in PATH.
  pause
  exit /b 1
)
call npm.cmd run build
