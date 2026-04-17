import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Check, X, Code, Info, Download } from 'lucide-react';

interface ShareLinkModalProps {
  shareCode: string;
  productName: string;
  onClose: () => void;
}

export function ShareLinkModal({ shareCode, productName, onClose }: ShareLinkModalProps) {
  const shareUrl = `${import.meta.env.VITE_FRONTEND_URL}/testimonials/submit?share_code=${shareCode}`;

  const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const qrRef = useRef<HTMLCanvasElement>(null);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const downloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${productName.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async (text: string, type: 'link' | 'embed') => {
    await navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#131315] p-6 rounded-xl w-full max-w-lg border border-[#262528]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#f9f5f8]">Compartir enlace</h3>
          <button
            onClick={onClose}
            className="text-[#adaaad] hover:text-[#f9f5f8] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#adaaad] mb-2">Enlace</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 p-3 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#f9f5f8] text-sm"
            />
            <button
              onClick={() => copyToClipboard(shareUrl, 'link')}
              className="px-4 py-3 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c28d9] transition-colors"
            >
              {copiedLink ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeCanvas
              ref={qrRef}
              value={shareUrl}
              size={150}
              bgColor="transparent"
              fgColor="#000000"
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2 bg-[#262528] text-[#f9f5f8] rounded-lg font-medium hover:bg-[#323238] transition-colors"
          >
            <Download size={18} />
            Descargar QR
          </button>
        </div>

        <button
          onClick={() => copyToClipboard(shareUrl, 'link')}
          className="w-full py-3 mb-6 bg-[#FFD63B] text-black rounded-lg font-bold hover:bg-[#ffc107] transition-colors"
        >
          {copiedLink ? '¡Copiado!' : 'Copiar enlace'}
        </button>

        <hr className="border-[#262528] mb-6" />

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Code size={16} className="text-[#cc97ff]" />
            <label className="text-sm text-[#adaaad]">Embed (Para sitios web)</label>
          </div>
          <textarea
            readOnly
            value={embedCode}
            className="w-full p-3 bg-[#1f1f22] border border-[#262528] rounded-lg text-[#f9f5f8] text-xs font-mono h-24 resize-none"
          />
        </div>

        <div className="flex items-start gap-2 mb-4 p-3 bg-[#1f1f22] rounded-lg">
          <Info size={16} className="text-[#cc97ff] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#adaaad]">
            Puedes modificar <code className="text-[#cc97ff]">width</code> y <code className="text-[#cc97ff]">height</code> según el espacio disponible en tu página web.
          </p>
        </div>

        <button
          onClick={() => copyToClipboard(embedCode, 'embed')}
          className="w-full py-3 bg-[#262528] text-[#f9f5f8] rounded-lg font-bold hover:bg-[#323238] transition-colors"
        >
          {copiedEmbed ? '¡Copiado!' : 'Copiar embed'}
        </button>
      </div>
    </div>
  );
}
