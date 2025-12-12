#!/usr/bin/env node

const { execSync } = require('child_process');

const port = process.argv[2];

if (!port) {
  console.error('Usage: npm run stop <port>');
  console.error('Example: npm run stop 4000');
  process.exit(1);
}

console.log(`Looking for processes on port ${port}...`);

try {
  if (process.platform === 'win32') {
    // Windows
    const result = execSync(`netstat -ano | findstr ":${port}" | findstr "LISTENING"`, { encoding: 'utf8' });
    const lines = result.trim().split('\n');
    const pids = new Set();

    lines.forEach(line => {
      const match = line.trim().match(/\s+(\d+)\s*$/);
      if (match) {
        pids.add(match[1]);
      }
    });

    if (pids.size === 0) {
      console.log(`No processes found on port ${port}`);
      process.exit(0);
    }

    pids.forEach(pid => {
      console.log(`Killing process ${pid}...`);
      execSync(`taskkill //F //PID ${pid}`, { stdio: 'inherit' });
    });

    console.log(`✓ Successfully killed processes on port ${port}`);
  } else {
    // Unix/Mac
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'inherit' });
    console.log(`✓ Successfully killed processes on port ${port}`);
  }
} catch (error) {
  if (error.status === 1 && error.stdout && error.stdout.length === 0) {
    console.log(`No processes found on port ${port}`);
  } else {
    console.error(`Error killing process on port ${port}`);
    console.error(error.message);
    process.exit(1);
  }
}
