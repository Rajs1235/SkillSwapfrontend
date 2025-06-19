import React, { useState } from 'react';

const AddContact = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <div className="p-3 border-t border-white/10 flex gap-2">
      <input
        className="flex-1 p-2 rounded-lg text-black"
        placeholder="Add contact"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddContact;
