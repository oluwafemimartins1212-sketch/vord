export default function DeployLanding() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">Deploy Your Bot</h1>
        <p className="text-center text-gray-400 mb-12">Choose your preferred deployment method and follow the instructions to get your Vord Wa Bot up and running.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <DeployCard href="/deploy/panel" title="Panel Deployment" desc="Deploy using a hosting panel" />
          <DeployCard href="/deploy/render" title="Render Deployment" desc="Deploy on Render platform" />
          <DeployCard href="/deploy/vps" title="VPS Deployment" desc="Deploy on your own VPS" />
        </div>
      </div>
    </main>
  );
}

function DeployCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <a href={href} className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition text-center">
      <h2 className="text-2xl font-bold text-purple-400 mb-2">{title}</h2>
      <p className="text-gray-400">{desc}</p>
    </a>
  );
}