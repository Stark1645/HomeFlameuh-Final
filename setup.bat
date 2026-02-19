@echo off
echo ========================================
echo HomeFlame - Local Development Setup
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd api
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Checking Environment Files...
if not exist "api\.env" (
    echo WARNING: api\.env not found!
    echo Please copy api\.env.example to api\.env and configure it.
    echo.
)

if not exist ".env.local" (
    echo WARNING: .env.local not found!
    echo Please create .env.local with VITE_API_URL=http://localhost:5000/api
    echo.
)

echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Configure api\.env with your MongoDB connection
echo 2. Configure .env.local with VITE_API_URL
echo 3. Run 'npm start' in api folder (Terminal 1)
echo 4. Run 'npm run dev' in root folder (Terminal 2)
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions.
echo ========================================
pause
