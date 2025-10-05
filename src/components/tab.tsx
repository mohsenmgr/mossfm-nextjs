'use client';

import { useState } from 'react';

type Tab = {
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: Tab[];
    parentNotifyChange: (idx: number) => void;
};

export default function Tabs({ tabs, parentNotifyChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    const handleChangeTab = (idx: number) => {
        setActiveTab(idx);
        parentNotifyChange(idx);
    };

    return (
        <div className='w-full'>
            {/* Tab Buttons */}
            <div className='flex justify-center border-b border-gray-700'>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === index
                                ? 'border-b-2 border-green-500 text-green-500'
                                : 'text-gray-400 hover:text-gray-200'
                        }`}
                        onClick={() => handleChangeTab(index)}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className='mt-4'>{tabs[activeTab].content}</div>
        </div>
    );
}
