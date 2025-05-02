// components/FunctionCall.tsx
import React, { useState } from 'react';

interface FunctionCallProps {
  functionName: string;
  paramNames: string[];
}

export default function FunctionCall({ functionName, paramNames }: FunctionCallProps) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const handleChange = (key: string, value: string) => {
    setParams({ ...params, [key]: value });
  };

  const handleCall = async () => {
    const res = await fetch(`/api/${functionName}/call-function`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ functionName, params }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="my-4">
      <h3 className="font-bold mb-2">Gọi hàm: {functionName}</h3>
      {paramNames.map((key) => (
        <div key={key} className="mb-2">
          <label>{key}</label>
          <input
            className="border rounded p-1 ml-2"
            value={params[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleCall} className="bg-green-600 text-white px-4 py-1 rounded">
        Gọi hàm
      </button>
      {result !== null && <p className="mt-2 font-bold">Kết quả: {result}</p>}
    </div>
  );
}
