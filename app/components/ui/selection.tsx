'use client'
import React from 'react';

// make a selection component that takes if its a yes no, or grade, the label, and the name as props
interface SelectionProps {
    type: 'yesno' | 'grade';
    label: string;
    name: string;
    value?: string | number | null;
    onChange?: (value: string) => void;
}

export default function Selection({ type, label, name, value, onChange }: SelectionProps) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
            {type === 'yesno' ? (
                <select 
                    id={name} 
                    name={name} 
                    value={value || ''} 
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Velg et alternativ</option>
                    <option value="yes">Ja</option>
                    <option value="no">Nei</option>
                </select>
            ) : (
                <select 
                    id={name} 
                    name={name} 
                    value={value || ''} 
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Velg karakter</option>
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </select>
            )}
        </div>
    );
}