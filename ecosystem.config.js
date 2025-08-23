module.exports = {
  apps: [
    {
      name: "ramy",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3010
      },
      max_memory_restart: "350M",
      instances: 1
    }
  ]
}
