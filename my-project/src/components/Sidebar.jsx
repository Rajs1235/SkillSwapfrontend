import React from 'react';
import axios from 'axios';
const Sidebar = ({ contacts, onSelect }) => (
  <div className="p-3 space-y-2 text-white">
    <h2 className="font-bold text-lg">Contacts</h2>
    {contacts.map((contact, index) => (
      <button
        key={index}
        className="block w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        onClick={() => onSelect(contact)}
      >
        {contact.name}
      </button>
    ))}
  </div>
);

export default Sidebar;
