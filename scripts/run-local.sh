#!/usr/bin/env bash
set -euo pipefail
echo "Run-local helper for QueueFlow 360 (bash)"

# If docker is available, use docker compose
if command -v docker >/dev/null 2>&1; then
  echo "Docker detected — starting stack with Docker Compose..."
  docker compose up --build
  exit 0
fi

echo "Docker not detected. Falling back to local run (backend + frontend)."

echo "Building backend..."
pushd backend >/dev/null
mvn -DskipTests package
JAR=$(ls target/*queueflow360-backend-*SNAPSHOT.jar 2>/dev/null || true)
if [ -z "$JAR" ]; then
  JAR=$(ls target/*.jar 2>/dev/null | grep queueflow360 || true)
fi
if [ -z "$JAR" ]; then
  echo "Backend jar not found. Exiting."; popd >/dev/null; exit 1
fi
echo "Starting backend: $JAR"
nohup java -jar "$JAR" >/dev/null 2>&1 &
popd >/dev/null

echo "Building frontend..."
pushd frontend >/dev/null
npm install
npm run build

# Serve static build
if command -v npx >/dev/null 2>&1; then
  echo "Serving frontend with npx serve -s dist -l 80"
  npx serve -s dist -l 80 &
else
  echo "npx not available — run 'npm run preview' to preview the site"
fi
popd >/dev/null

echo "Local run initiated. Backend: http://localhost:8080, Frontend: http://localhost"