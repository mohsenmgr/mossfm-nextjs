'use client';

import { useEffect, useState } from 'react';

import { AboutMeObj, AboutMeTextItem } from '@/types/aboutMe';

// --- Helpers for text ↔ HTML ---

export function itemsToHtml(items: AboutMeTextItem[]): string {
    return items
        .map((item) => {
            const safeValue = item.value.replace(/ /g, '[[space]]'); // turn spaces into [[space]]

            if (item.highlight) {
                return `<b>${safeValue}</b>`;
            }

            return safeValue;
        })
        .join('');
}

export function parseHtmlToItems(html: string): AboutMeTextItem[] {
    const items: AboutMeTextItem[] = [];

    // Split on <b>...</b> while keeping the tags
    const regex = /(<b>.*?<\/b>)/gi;
    const parts = html.split(regex);

    parts.forEach((part) => {
        if (!part) return;

        if (part.startsWith('<b>') && part.endsWith('</b>')) {
            // Bold part → strip tags and replace [[space]] with real spaces
            const text = part.replace(/<\/?b>/g, '').replace(/\[\[space\]\]/g, ' ');
            items.push({ value: text, highlight: true });
        } else {
            // Normal text → replace [[space]] with real spaces
            const text = part.replace(/\[\[space\]\]/g, ' ');
            if (text.length > 0) {
                items.push({ value: text, highlight: false });
            }
        }
    });

    return items;
}

interface AboutMeAdminProps {
    aboutMeObject: AboutMeObj;
    onSave: (obj: AboutMeObj) => Promise<void>;
}

export default function AboutMeAdmin({ aboutMeObject, onSave }: AboutMeAdminProps) {
    const [rawHtml, setRawHtml] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');

    // 👇 sync state when props change
    useEffect(() => {
        if (aboutMeObject.text) {
            setRawHtml(itemsToHtml(aboutMeObject.text));
        }
        if (aboutMeObject.skills) {
            setSkills(aboutMeObject.skills);
        }
    }, [aboutMeObject]);

    const handleSave = () => {
        const parsedText = parseHtmlToItems(rawHtml);
        onSave({ ...aboutMeObject, text: parsedText, skills });
    };

    // --- Skill management ---
    const addSkill = () => {
        if (!newSkill.trim()) return;
        setSkills((prev) => [...prev, newSkill.trim()]);
        setNewSkill('');
    };

    const removeSkill = (index: number) => {
        setSkills((prev) => prev.filter((_, i) => i !== index));
    };

    const moveSkill = (index: number, direction: 'up' | 'down') => {
        setSkills((prev) => {
            const newArr = [...prev];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= newArr.length) return prev;
            [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
            return newArr;
        });
    };

    return (
        <div className='flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 shadow-lg'>
            <div className='space-y-6'>
                {/* Text editor */}
                <label className='block'>
                    <span className='text-gray-300'>About Me Text (use &lt;b&gt; for highlights)</span>
                    <textarea
                        value={rawHtml}
                        onChange={(e) => setRawHtml(e.target.value)}
                        rows={5}
                        className='mt-2 w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-white'
                    />
                </label>

                {/* Skills section */}
                <div>
                    <h3 className='mb-2 text-lg font-semibold text-white'>Skills</h3>
                    <div className='space-y-2'>
                        {skills.map((skill, i) => (
                            <div key={i} className='flex items-center gap-2'>
                                <input
                                    type='text'
                                    value={skill}
                                    onChange={(e) =>
                                        setSkills((prev) => prev.map((s, idx) => (idx === i ? e.target.value : s)))
                                    }
                                    className='flex-1 rounded-lg border border-gray-600 bg-gray-800 p-2 text-white'
                                />
                                <button
                                    onClick={() => moveSkill(i, 'up')}
                                    className='rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-600'>
                                    ↑
                                </button>
                                <button
                                    onClick={() => moveSkill(i, 'down')}
                                    className='rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-600'>
                                    ↓
                                </button>
                                <button
                                    onClick={() => removeSkill(i)}
                                    className='rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500'>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add new skill */}
                    <div className='mt-4 flex gap-2'>
                        <input
                            type='text'
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder='New skill'
                            className='flex-1 rounded-lg border border-gray-600 bg-gray-800 p-2 text-white'
                        />
                        <button
                            onClick={addSkill}
                            className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500'>
                            Add
                        </button>
                    </div>
                </div>

                {/* Save */}
                <button
                    onClick={handleSave}
                    className='w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500'>
                    Save
                </button>
            </div>
        </div>
    );
}
