module.exports = {
  apps: [
    {
      name: "simple-ai-academy",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/home/manu/apps/simple-ai-academy",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      log_file: "/home/manu/apps/simple-ai-academy/logs/combined.log",
      out_file: "/home/manu/apps/simple-ai-academy/logs/out.log",
      error_file: "/home/manu/apps/simple-ai-academy/logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      max_memory_restart: "512M",
      restart_delay: 3000,
      max_restarts: 5,
      min_uptime: "10s",
      kill_timeout: 5000,
      listen_timeout: 8000,
    },
  ],
};
