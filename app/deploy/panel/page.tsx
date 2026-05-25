export default function PanelDeploy() {
  const script = `const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = {
  SESSION_ID: 'your-session-id',
  OWNER_NUMBER: '234XXXXXXXXXX',
  WORKTYPE: 'private',
  PREFIX: '[.]',
  TIMEZONE: 'Africa/Lagos',
  OWNER_NAME: 'Victory Lord',
  BOT_NAME: 'Vord'
};

function writeEnvFile(filePath) {
  const envText = Object.entries(config)
    .map(([key, value]) => \`\${key}=\${value}\`)
    .join('\\n');
  fs.writeFileSync(filePath, envText);
  console.log('config.env written');
}

function moveFilesToRoot(srcDir, destDir) {
  const files = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const file of files) {
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, file.name);
    if (fs.existsSync(destPath)) fs.rmSync(destPath, { recursive: true, force: true });
    fs.renameSync(srcPath, destPath);
  }
}

try {
  console.log('Cloning Vord bot...');
  execSync('git clone https://github.com/oluwafemimartins1212-sketch/vord-bot temp-dir', { stdio: 'inherit' });
  const rootDir = process.cwd();
  const tempDir = path.join(rootDir, 'temp-dir');
  moveFilesToRoot(tempDir, rootDir);
  fs.rmdirSync(tempDir, { recursive: true });
  writeEnvFile(path.join(rootDir, 'config.env'));
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Starting bot...');
  execSync('npm start', { stdio: 'inherit' });
} catch (err) {
  console.error('Setup failed:', err.message);
  process.exit(1);
}`;

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Panel Deployment</h1>
        <p className="text-gray-400 mb-8">Deploy using a hosting panel. Watch our tutorial to get one and deploy on it.</p>
        <ol className="list-decimal list-inside space-y-6 text-gray-300">
          <li>Create a new file on your panel – name it <code className="bg-gray-800 px-2 py-1 rounded">index.js</code></li>
          <li>Paste the following code:
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2"><code>{script}</code></pre>
          </li>
          <li>Update the startup command to <code className="bg-gray-800 px-2 py-1 rounded">node index.js</code> in the "Startup" section of your panel.</li>
        </ol>
      </div>
    </main>
  );
}