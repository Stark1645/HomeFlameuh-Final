@echo off
echo Starting HomeFlame Application...
echo.
start "Backend" cmd /k "cd backend && mvn spring-boot:run"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "npm run dev"
echo.
echo Both services starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
