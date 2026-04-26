export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    // Kita menggunakan API pihak ketiga yang stabil untuk bypass limit TeraBox
    const response = await fetch(`https://terabox-api.vercel.app/api?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status === 'success') {
      return res.status(200).json({
        success: true,
        filename: data.filename,
        size: data.size,
        downloadUrl: data.download_link,
      });
    } else {
      return res.status(400).json({ success: false, message: 'Gagal mengambil link. Pastikan link valid.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}