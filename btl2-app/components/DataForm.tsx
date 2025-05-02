// components/DataForm.tsx
import React, { useState } from 'react';

interface DataFormProps {
  fields: string[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

export default function DataForm({ fields, initialData = {}, onSubmit }: DataFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {fields.map((field) => (
        <div key={field}>
          <label className="block font-medium">{field}</label>
          <input
            type="text"
            value={formData[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Lưu
      </button>
    </form>
  );
}
