export const commands = [
  // Git Commands
  {
    id: 1,
    name: "git init",
    description: "Initialize a new Git repository in the current directory",
    tags: ["Git", "Repository", "Version Control"]
  },
  {
    id: 2,
    name: "git clone",
    description: "Clone a repository from a remote source to your local machine",
    tags: ["Git", "Repository", "Remote"]
  },
  {
    id: 3,
    name: "git add",
    description: "Stage files for the next commit. Use 'git add .' to add all files",
    tags: ["Git", "Staging", "Commit"]
  },
  {
    id: 4,
    name: "git commit",
    description: "Create a new commit with staged changes. Use -m flag for message",
    tags: ["Git", "Commit", "Version Control"]
  },
  {
    id: 5,
    name: "git push",
    description: "Upload local commits to a remote repository",
    tags: ["Git", "Remote", "Upload"]
  },
  {
    id: 6,
    name: "git pull",
    description: "Download and integrate changes from a remote repository",
    tags: ["Git", "Remote", "Download"]
  },
  {
    id: 7,
    name: "git branch",
    description: "List, create, or delete branches. Use -d flag to delete",
    tags: ["Git", "Branch", "Version Control"]
  },
  {
    id: 8,
    name: "git checkout",
    description: "Switch between branches or restore files. Use -b for new branch",
    tags: ["Git", "Branch", "Switch"]
  },
  {
    id: 9,
    name: "git merge",
    description: "Merge branches together. Use --no-ff for explicit merge commit",
    tags: ["Git", "Merge", "Branch"]
  },
  {
    id: 10,
    name: "git rebase",
    description: "Reapply commits on top of another base tip",
    tags: ["Git", "Rebase", "Branch"]
  },
  {
    id: 11,
    name: "git log",
    description: "Show commit history. Use --oneline for compact view",
    tags: ["Git", "History", "Log"]
  },
  {
    id: 12,
    name: "git status",
    description: "Show the working tree status and staged changes",
    tags: ["Git", "Status", "Working Tree"]
  },

  // Docker Commands
  {
    id: 13,
    name: "docker run",
    description: "Create and start a new container from an image",
    tags: ["Docker", "Container", "Deployment"]
  },
  {
    id: 14,
    name: "docker build",
    description: "Build a Docker image from a Dockerfile",
    tags: ["Docker", "Image", "Build"]
  },
  {
    id: 15,
    name: "docker ps",
    description: "List running containers. Use -a to show all containers",
    tags: ["Docker", "Container", "List"]
  },
  {
    id: 16,
    name: "docker images",
    description: "List all Docker images on your system",
    tags: ["Docker", "Image", "List"]
  },
  {
    id: 17,
    name: "docker stop",
    description: "Stop running containers gracefully",
    tags: ["Docker", "Container", "Stop"]
  },
  {
    id: 18,
    name: "docker rm",
    description: "Remove containers. Use -f to force removal",
    tags: ["Docker", "Container", "Remove"]
  },
  {
    id: 19,
    name: "docker exec",
    description: "Execute a command in a running container",
    tags: ["Docker", "Container", "Execute"]
  },
  {
    id: 20,
    name: "docker-compose up",
    description: "Create and start containers from docker-compose.yml",
    tags: ["Docker", "Compose", "Orchestration"]
  },

  // npm/Node.js Commands
  {
    id: 21,
    name: "npm install",
    description: "Install dependencies from package.json or a specific package",
    tags: ["npm", "Node.js", "Dependencies"]
  },
  {
    id: 22,
    name: "npm start",
    description: "Run the start script defined in package.json",
    tags: ["npm", "Node.js", "Script"]
  },
  {
    id: 23,
    name: "npm run",
    description: "Execute a script defined in package.json",
    tags: ["npm", "Node.js", "Script"]
  },
  {
    id: 24,
    name: "npm update",
    description: "Update packages to their latest version",
    tags: ["npm", "Node.js", "Update"]
  },
  {
    id: 25,
    name: "npm audit",
    description: "Scan for vulnerabilities in dependencies",
    tags: ["npm", "Node.js", "Security"]
  },
  {
    id: 26,
    name: "npm publish",
    description: "Publish a package to the npm registry",
    tags: ["npm", "Node.js", "Publish"]
  },

  // Linux/Unix Commands
  {
    id: 27,
    name: "ls",
    description: "List files and directories in the current directory",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 28,
    name: "cd",
    description: "Change directory. Use 'cd ..' to go up one level",
    tags: ["Linux", "Unix", "Navigation"]
  },
  {
    id: 29,
    name: "pwd",
    description: "Print working directory - shows current directory path",
    tags: ["Linux", "Unix", "Navigation"]
  },
  {
    id: 30,
    name: "mkdir",
    description: "Create a new directory. Use -p to create parent directories",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 31,
    name: "rm",
    description: "Remove files or directories. Use -rf for recursive force delete",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 32,
    name: "cp",
    description: "Copy files or directories. Use -r for recursive copy",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 33,
    name: "mv",
    description: "Move or rename files and directories",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 34,
    name: "cat",
    description: "Display file contents. Use with pipes for text processing",
    tags: ["Linux", "Unix", "File System"]
  },
  {
    id: 35,
    name: "grep",
    description: "Search for patterns in files. Use -r for recursive search",
    tags: ["Linux", "Unix", "Search", "Text"]
  },
  {
    id: 36,
    name: "chmod",
    description: "Change file permissions. Use +x to make executable",
    tags: ["Linux", "Unix", "Permissions"]
  },
  {
    id: 37,
    name: "ps",
    description: "Show running processes. Use aux for detailed list",
    tags: ["Linux", "Unix", "Process"]
  },
  {
    id: 38,
    name: "kill",
    description: "Terminate processes by PID. Use -9 for force kill",
    tags: ["Linux", "Unix", "Process"]
  },
  {
    id: 39,
    name: "curl",
    description: "Transfer data from or to a server. Great for API testing",
    tags: ["Linux", "Unix", "HTTP", "API"]
  },
  {
    id: 40,
    name: "wget",
    description: "Download files from the web. Supports recursive downloads",
    tags: ["Linux", "Unix", "Download", "HTTP"]
  },
  {
    id: 41,
    name: "ssh",
    description: "Connect to remote servers securely. Use -i for key file",
    tags: ["Linux", "Unix", "Remote", "Security"]
  },
  {
    id: 42,
    name: "tar",
    description: "Create or extract archive files. Use -xzf for extract",
    tags: ["Linux", "Unix", "Archive", "Compression"]
  },
  {
    id: 43,
    name: "find",
    description: "Search for files in directory hierarchy",
    tags: ["Linux", "Unix", "Search", "File System"]
  },
  {
    id: 44,
    name: "sed",
    description: "Stream editor for filtering and transforming text",
    tags: ["Linux", "Unix", "Text", "Processing"]
  },
  {
    id: 45,
    name: "awk",
    description: "Pattern scanning and text processing language",
    tags: ["Linux", "Unix", "Text", "Processing"]
  },

  // Kubernetes Commands
  {
    id: 46,
    name: "kubectl get pods",
    description: "List all pods in the current namespace",
    tags: ["Kubernetes", "Pods", "List"]
  },
  {
    id: 47,
    name: "kubectl apply",
    description: "Apply configuration to a resource from a file or stdin",
    tags: ["Kubernetes", "Deployment", "Configuration"]
  },
  {
    id: 48,
    name: "kubectl delete",
    description: "Delete resources by file names, stdin, resources and names",
    tags: ["Kubernetes", "Delete", "Resources"]
  },
  {
    id: 49,
    name: "kubectl logs",
    description: "Print the logs for a container in a pod",
    tags: ["Kubernetes", "Logs", "Debugging"]
  },
  {
    id: 50,
    name: "kubectl exec",
    description: "Execute a command in a container",
    tags: ["Kubernetes", "Execute", "Container"]
  },
  {
    id: 51,
    name: "kubectl port-forward",
    description: "Forward one or more local ports to a pod",
    tags: ["Kubernetes", "Port", "Forward"]
  },
  {
    id: 52,
    name: "kubectl scale",
    description: "Set a new size for a deployment, replica set, or replication controller",
    tags: ["Kubernetes", "Scale", "Deployment"]
  },

  // AWS CLI Commands
  {
    id: 53,
    name: "aws s3 ls",
    description: "List S3 buckets or objects in a bucket",
    tags: ["AWS", "S3", "Storage"]
  },
  {
    id: 54,
    name: "aws ec2 describe-instances",
    description: "Describe EC2 instances in your account",
    tags: ["AWS", "EC2", "Compute"]
  },
  {
    id: 55,
    name: "aws lambda list-functions",
    description: "List Lambda functions in your account",
    tags: ["AWS", "Lambda", "Serverless"]
  },
  {
    id: 56,
    name: "aws configure",
    description: "Configure AWS CLI with access keys and region",
    tags: ["AWS", "Configuration", "Setup"]
  },
  {
    id: 57,
    name: "aws sts get-caller-identity",
    description: "Get details about the current AWS identity",
    tags: ["AWS", "STS", "Identity"]
  },

  // Database Commands
  {
    id: 58,
    name: "mysql -u root -p",
    description: "Connect to MySQL database as root user",
    tags: ["Database", "MySQL", "Connection"]
  },
  {
    id: 59,
    name: "psql -U username -d database",
    description: "Connect to PostgreSQL database",
    tags: ["Database", "PostgreSQL", "Connection"]
  },
  {
    id: 60,
    name: "mongosh",
    description: "Connect to MongoDB shell",
    tags: ["Database", "MongoDB", "Connection"]
  },
  {
    id: 61,
    name: "redis-cli",
    description: "Connect to Redis command line interface",
    tags: ["Database", "Redis", "Connection"]
  },

  // Network Commands
  {
    id: 62,
    name: "ping",
    description: "Test network connectivity to a host",
    tags: ["Network", "Connectivity", "Testing"]
  },
  {
    id: 63,
    name: "nslookup",
    description: "Query DNS servers for domain information",
    tags: ["Network", "DNS", "Lookup"]
  },
  {
    id: 64,
    name: "netstat",
    description: "Display network connections, routing tables, interface statistics",
    tags: ["Network", "Connections", "Statistics"]
  },
  {
    id: 65,
    name: "traceroute",
    description: "Trace the route packets take to a network host",
    tags: ["Network", "Routing", "Trace"]
  },
  {
    id: 66,
    name: "ifconfig",
    description: "Display or configure network interface parameters",
    tags: ["Network", "Interface", "Configuration"]
  },

  // Security Commands
  {
    id: 67,
    name: "openssl",
    description: "OpenSSL command line tool for cryptography and SSL/TLS",
    tags: ["Security", "SSL", "Cryptography"]
  },
  {
    id: 68,
    name: "nmap",
    description: "Network exploration and security auditing tool",
    tags: ["Security", "Network", "Scanning"]
  },
  {
    id: 69,
    name: "ssh-keygen",
    description: "Generate SSH key pairs for authentication",
    tags: ["Security", "SSH", "Authentication"]
  },
  {
    id: 70,
    name: "gpg",
    description: "GNU Privacy Guard for encryption and digital signatures",
    tags: ["Security", "Encryption", "PGP"]
  },

  // Python Commands
  {
    id: 71,
    name: "python --version",
    description: "Check Python version installed on the system",
    tags: ["Python", "Version", "Check"]
  },
  {
    id: 72,
    name: "pip install",
    description: "Install Python packages from PyPI",
    tags: ["Python", "Pip", "Install"]
  },
  {
    id: 73,
    name: "python -m venv",
    description: "Create a virtual environment for Python",
    tags: ["Python", "Virtual Environment", "Setup"]
  },
  {
    id: 74,
    name: "jupyter notebook",
    description: "Start Jupyter notebook server",
    tags: ["Python", "Jupyter", "Notebook"]
  },

  // System Monitoring
  {
    id: 75,
    name: "top",
    description: "Display system processes and resource usage in real-time",
    tags: ["Monitoring", "System", "Processes"]
  },
  {
    id: 76,
    name: "htop",
    description: "Interactive process viewer with better UI than top",
    tags: ["Monitoring", "System", "Interactive"]
  },
  {
    id: 77,
    name: "df",
    description: "Display disk space usage for filesystems",
    tags: ["Monitoring", "Disk", "Space"]
  },
  {
    id: 78,
    name: "du",
    description: "Estimate file space usage",
    tags: ["Monitoring", "Disk", "Usage"]
  },
  {
    id: 79,
    name: "free",
    description: "Display amount of free and used memory in the system",
    tags: ["Monitoring", "Memory", "Usage"]
  },

  // Package Managers
  {
    id: 80,
    name: "apt update",
    description: "Update package list on Debian/Ubuntu systems",
    tags: ["Package Manager", "APT", "Update"]
  },
  {
    id: 81,
    name: "apt install",
    description: "Install packages on Debian/Ubuntu systems",
    tags: ["Package Manager", "APT", "Install"]
  },
  {
    id: 82,
    name: "yum install",
    description: "Install packages on Red Hat/CentOS systems",
    tags: ["Package Manager", "YUM", "Install"]
  },
  {
    id: 83,
    name: "brew install",
    description: "Install packages using Homebrew on macOS",
    tags: ["Package Manager", "Homebrew", "Install"]
  },
  {
    id: 84,
    name: "snap install",
    description: "Install snap packages on Linux systems",
    tags: ["Package Manager", "Snap", "Install"]
  },

  // Development Tools
  {
    id: 85,
    name: "git log --oneline",
    description: "Show compact commit history with one line per commit",
    tags: ["Git", "History", "Compact"]
  },
  {
    id: 86,
    name: "git stash",
    description: "Temporarily save changes without committing",
    tags: ["Git", "Stash", "Temporary"]
  },
  {
    id: 87,
    name: "git reset",
    description: "Reset current branch to a specific commit",
    tags: ["Git", "Reset", "Branch"]
  },
  {
    id: 88,
    name: "docker-compose down",
    description: "Stop and remove containers created by docker-compose",
    tags: ["Docker", "Compose", "Stop"]
  },
  {
    id: 89,
    name: "docker system prune",
    description: "Remove unused Docker data (containers, networks, images)",
    tags: ["Docker", "Cleanup", "System"]
  },
  {
    id: 90,
    name: "npm ci",
    description: "Install dependencies exactly as specified in package-lock.json",
    tags: ["npm", "Node.js", "CI"]
  }
]; 