export default function VPSDeploy() {
  const commands = `sudo apt update && sudo apt upgrade -y
sudo apt install git ffmpeg curl -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
sudo npm install -g yarn
yarn global add pm2
git clone https://github.com/oluwafemimartins1212-sketch/vord-bot
cd vord-bot
npm install
# Create config.env file with your variables
pm2 start index.js --name vord-bot
pm2 save
pm2 startup`;

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">VPS Deployment</h1>
        <p className="text-gray-400 mb-8">Deploy on your own VPS (Ubuntu/Debian)</p>
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mb-6">{commands}</pre>
        <p className="text-gray-400">After installation, create a <code className="bg-gray-800 px-2 py-1 rounded">config.env</code> file with your session ID, owner number, etc., then run <code className="bg-gray-800 px-2 py-1 rounded">pm2 start index.js --name vord-bot</code>.</p>
      </div>
    </main>
  );
}