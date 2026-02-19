@echo off
echo ========================================
echo HomeFlame Setup Checker
echo ========================================
echo.

echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found! Install from nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js installed
node --version
echo.

echo Checking api folder...
if not exist "api" (
    echo [ERROR] api folder not found!
    pause
    exit /b 1
)
echo [OK] api folder exists
echo.

echo Checking api/package.json...
if not exist "api\package.json" (
    echo [ERROR] api/package.json not found!
    pause
    exit /b 1
)
echo [OK] api/package.json exists
echo.

echo Checking api/.env...
if not exist "api\.env" (
    echo [WARNING] api/.env not found!
    echo Creating from example...
    if exist "api\.env.example" (
        copy "api\.env.example" "api\.env"
        echo [CREATED] Please edit api\.env with your MongoDB URL
    ) else (
        echo Creating default .env...
        (
            echo PORT=5000
            echo DATABASE_URL=mongodb+srv://test:test123@cluster0.mongodb.net/homeflame?retryWrites=true^&w=majority
            echo JWT_SECRET=my_super_secret_jwt_key_12345
            echo CLIENT_URL=http://localhost:5173
        ) > "api\.env"
        echo [CREATED] api/.env with test database
    )
) else (
    echo [OK] api/.env exists
)
echo.

echo Checking .env.local...
if not exist ".env.local" (
    echo [WARNING] .env.local not found!
    echo Creating...
    echo VITE_API_URL=http://localhost:5000/api > .env.local
    echo [CREATED] .env.local
) else (
    echo [OK] .env.local exists
)
echo.

echo Checking api/node_modules...
if not exist "api\node_modules" (
    echo [WARNING] Backend dependencies not installed
    echo Installing now...
    cd api
    call npm install
    cd ..
    echo [DONE] Backend dependencies installed
) else (
    echo [OK] Backend dependencies installed
)
echo.

echo Checking frontend node_modules...
if not exist "node_modules" (
    echo [WARNING] Frontend dependencies not installed
    echo Installing now...
    call npm install
    echo [DONE] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies installed
)
echo.

echo ========================================
echo Setup Check Complete!
echo ========================================
echo.
echo To start the app:
echo 1. Open Terminal 1: cd api ^&^& npm start
echo 2. Open Terminal 2: npm run dev
echo 3. Open browser: http://localhost:5173
echo.
echo See QUICK_FIX.md if you have issues
echo ========================================
pause
