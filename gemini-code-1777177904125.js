import { useState } from 'react';

export default function TeraBoxDownloader() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/terabox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success) setResult(data);
      else alert(data.message);
    } catch (err) {
      alert('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <h1 className="text-3xl font-light tracking-tight text-center mb-2">TeraBox <span className="font-bold">Downloader</span></h1>
        <p className="text-slate-400 text-center text-sm mb-10">Unduh file dengan cepat dan tanpa batas.</p>
        
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all text-sm"
            placeholder="Tempel link TeraBox di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-2xl font-medium transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Sedang Memproses...' : 'Generate Download Link'}
          </button>
        </div>

        {result && (
          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in zoom-in duration-300">
            <h3 className="font-bold text-blue-900 text-sm mb-1">File Berhasil Ditemukan:</h3>
            <p className="text-xs text-blue-700 mb-4 truncate">{result.filename} ({result.size})</p>
            <a
              href={result.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center bg-blue-600 text-white p-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Klik untuk Download
            </a>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-slate-400 text-xs">
        &copy; 2026 ElFarhan Project • Minimalist European Design
      </footer>
    </div>
  );
}