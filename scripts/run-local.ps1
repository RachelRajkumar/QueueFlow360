#!/usr/bin/env pwsh
Write-Host "Run-local helper for QueueFlow 360 (PowerShell)"

# Check for Docker
$dockerAvailable = $false
try {
    docker version > $null 2>&1
    $dockerAvailable = $true
} catch {
    $dockerAvailable = $false
}

if ($dockerAvailable) {
    Write-Host "Docker detected — starting stack with Docker Compose..."
    docker compose up --build
    exit 0
}

Write-Host "Docker not detected. Falling back to local run (backend + frontend)."

# Build and run backend
Push-Location "backend"
Write-Host "Building backend (Maven)..."
mvn -DskipTests package
$jar = Get-ChildItem -Path target -Filter "*queueflow360-backend-*-SNAPSHOT.jar" -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $jar) {
    $jar = Get-ChildItem -Path target -Filter "*.jar" | Where-Object { $_.Name -like "*queueflow360*" } | Select-Object -First 1
}
if ($jar) {
    Write-Host "Starting backend jar: $($jar.Name)"
    Start-Process -FilePath "java" -ArgumentList "-jar", "$($jar.FullName)" -NoNewWindow
} else {
    Write-Error "Backend jar not found in target/. Build may have failed."
    Pop-Location
    exit 1
}
Pop-Location

# Build frontend
Push-Location "frontend"
Write-Host "Installing frontend dependencies and building (npm)..."
npm install
npm run build

# Serve frontend (try npx serve or vite preview)
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Serving frontend using 'npx serve -s dist -l 80'"
    Start-Process -FilePath "npx" -ArgumentList "serve -s dist -l 80" -NoNewWindow
} else {
    Write-Host "npx not available — running 'npm run preview'"
    Start-Process -FilePath "npm" -ArgumentList "run", "preview" -NoNewWindow
}
Pop-Location

Write-Host "Local run initiated. Backend: http://localhost:8080, Frontend: http://localhost (or preview port)."