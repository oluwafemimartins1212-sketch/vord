export default function RenderDeploy() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Render Deployment</h1>
        <p className="text-gray-400 mb-8">Deploy on Render platform</p>
        <ol className="list-decimal list-inside space-y-6 text-gray-300">
          <li>Create a Render account at <a href="https://dashboard.render.com" className="text-purple-400 hover:underline">dashboard.render.com</a></li>
          <li>Generate API Key: Go to API Keys settings → Create API key → copy the key</li>
          <li>Get Session ID from <a href="/session" className="text-purple-400 hover:underline">Vord Session Manager</a></li>
          <li>Deploy using Blueprint:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Go to the <a href="https://dashboard.render.com/blueprint/new" className="text-purple-400 hover:underline">Render Blueprint</a> page</li>
              <li>Give your blueprint a name</li>
              <li>In environment variables, add:
                <pre className="bg-gray-800 p-3 rounded-lg mt-2 text-sm">SESSION_ID=your_session_id
OWNER_NUMBER=234XXXXXXXXXX
WORKTYPE=private
PREFIX=[.]
TIMEZONE=Africa/Lagos
OWNER_NAME=Victory Lord
BOT_NAME=Vord
RENDER_API_KEY=your_api_key</pre>
              </li>
              <li>Click "Deploy Blueprint"</li>
            </ul>
          </li>
          <li>Keep your bot running: Copy the service URL, sign up on Betterstack, create a monitor with that URL.</li>
        </ol>
      </div>
    </main>
  );
}