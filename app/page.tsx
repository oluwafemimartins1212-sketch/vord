export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Vord Wa Bot
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Powerful, customizable WhatsApp bot framework. Get started today.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <span>⭐</span> <span>0 Stars</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <span>💬</span> <span>0 Forks</span>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <Card href="/session" title="Session" desc="Generate session IDs" />
          <Card href="/deploy" title="Deploy" desc="Deploy your bot" />
          <Card href="/plugins" title="Plugins" desc="Extend plugins" />
          <Card href="/suggest" title="Suggest" desc="Share your ideas" />
          <Card href="https://github.com/oluwafemimartins1212-sketch/vord" title="Repo" desc="Access repository" />
        </div>
      </div>
    </main>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      className="block p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-1"
    >
      <h3 className="text-xl font-bold text-purple-400 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </a>
  );
}