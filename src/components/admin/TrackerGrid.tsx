import { useState } from 'react';

import { Follower } from '@/types/Follower';

type TrackerGridProps = {
    items: Follower[];
    setItems: React.Dispatch<React.SetStateAction<Follower[]>>;
};

const TrackerGrid = (props: TrackerGridProps) => {
    const { items, setItems } = props;

    const [checked, setChecked] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this follower?')) return;

        const res = await fetch(`/api/tracker/${id}`, { method: 'DELETE' });
        if (res.ok) {
            const newArray = items.filter((item) => item._id !== id);
            setItems(newArray);
        } else alert(`Delete request failed code:${res.status} status:${res.statusText}`);
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-4'>
                {items.length === 0 ? (
                    <p className='text-gray-400'>No items yet.</p>
                ) : (
                    <ul className='space-y-4'>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className='flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-800 p-4 shadow-md transition hover:border-green-500 hover:bg-gray-700 sm:flex-row sm:items-center sm:justify-between'>
                                {/* Content columns */}
                                <div className='w-full sm:w-1/4'>
                                    <span className='font-medium text-white'>{item.handle}</span>
                                </div>
                                {item.name && (
                                    <div className='w-full sm:w-1/4'>
                                        <span className='font-medium text-white'>{item.name}</span>
                                    </div>
                                )}
                                {item.surname && (
                                    <div className='w-full sm:w-1/4'>
                                        <span className='font-medium text-white'>{item.surname}</span>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className='flex w-full flex-wrap gap-2 sm:w-auto'>
                                    <button className='rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-400'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => item._id && handleDelete(item._id)}
                                        className='rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500'>
                                        Delete
                                    </button>
                                    <div className='flex items-center'>
                                        <input
                                            defaultChecked={checked}
                                            id='checked-checkbox'
                                            type='checkbox'
                                            className='h-5 w-5 rounded-sm border-gray-300 bg-green-100 text-green-600 focus:ring-2 focus:ring-green-500'
                                            onClick={() => setChecked((prev) => !prev)}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default TrackerGrid;
