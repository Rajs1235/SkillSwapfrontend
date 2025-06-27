import React from 'react';
import { FaDownload } from 'react-icons/fa';

function CertificateCard({ certificate }) {
  if (!certificate) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-lg">No certificate data provided.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto hover:shadow-2xl transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{certificate.title}</h2>
        <span className="text-sm text-green-300">
          {new Date(certificate.date).toLocaleDateString()}
        </span>
      </div>

      <p className="text-white/80 mb-4">{certificate.description}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-white/70">Awarded to: <span className="font-medium">{certificate.name}</span></p>

        <a
          href={certificate.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-700 transition text-sm"
        >
          <FaDownload /> Download
        </a>
      </div>
    </div>
  );
}

export default CertificateCard;
