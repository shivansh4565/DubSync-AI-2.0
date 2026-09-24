"""
DubSync AI - Unified Runner
Starts both the FastAPI Backend (port 8000) and Next.js Frontend (port 3000)
"""

import os
import sys
import subprocess
import time
import signal

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(root_dir, "frontend")

    print("=" * 60)
    print("🎬 Starting DubSync AI Studio...")
    print("=" * 60)
    print("1. FastAPI Backend: http://127.0.0.1:8000 (API Docs: /docs)")
    print("2. Next.js Studio Frontend: http://localhost:3000")
    print("=" * 60)

    # Start FastAPI backend
    backend_cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
    backend_proc = subprocess.Popen(backend_cmd, cwd=root_dir)

    # Start Next.js frontend
    frontend_cmd = ["npm.cmd" if os.name == "nt" else "npm", "run", "dev"]
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping DubSync AI services...")
        backend_proc.terminate()
        frontend_proc.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
