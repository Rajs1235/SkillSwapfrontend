// src/components/DashboardCard.jsx
import React from 'react';

function DashboardCard({ title, icon, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 p-4 rounded-xl shadow border border-white/20 cursor-pointer hover:bg-white/20 transition"
    >
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      {description && <p className="text-white/70">{description}</p>}
    </div>
  );
}

export default DashboardCard;
