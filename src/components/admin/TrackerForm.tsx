import { useState } from 'react';

import { Follower } from '@/types/Follower';
import { SocialMedia } from '@/types/SocialMedia';

import { FaSearch } from 'react-icons/fa';

type TrackFormProps = {
    //remember this
    items: Follower[];
    setItems: React.Dispatch<React.SetStateAction<Follower[]>>;
    refresh: () => Promise<void>;
};

const TrackerForm = (props: TrackFormProps) => {
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [socialMedia, setSocialMedia] = useState<SocialMedia>('instagram');
    const [disabled, setDisabled] = useState(false);

    const { items, setItems, refresh } = props;

    const socialMedias = ['instagram', 'facebook', 'twitter'];

    const postFollower = async function (follower: Follower) {
        const result = await fetch('/api/tracker/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(follower)
        });

        if (!result.ok) throw new Error('Failed to fetch movie');
        const postedFollower = await result.json();
        setItems((prev) => [...prev, postedFollower]);
    };

    const handleButtonOK = () => {
        if (!items.find((follwer) => follwer.handle === username)) {
            setDisabled(true);
            try {
                postFollower({
                    handle: username,
                    socialMedia: socialMedia,
                    name: name,
                    surname: surname
                });
                setUserName('');
                setName('');
                setSurname('');
                setSocialMedia('instagram');
            } catch (error) {
                alert(error);
            } finally {
                setDisabled(false);
            }
        }
    };

    const handleButtonSearch = () => {
        const trimmedUserName = username.trim();
        const trimmedName = name.trim();
        if (trimmedUserName !== '') {
            const newItems = items.filter((item) => item.handle?.toLowerCase().includes(trimmedUserName.toLowerCase()));
            setItems(newItems);
        } else if (trimmedName !== '') {
            const newItems = items.filter((item) => item.name?.toLowerCase().includes(trimmedName.toLowerCase()));
            setItems(newItems);
        } else {
            refresh();
        }
    };

    return (
        <>
            <div className='flex items-center gap-2 align-middle'>
                <input
                    placeholder='Username'
                    className='w-xl rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                    type='text'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    placeholder='Name'
                    className='w-xl rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder='Surname'
                    className='w-xl rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                    type='text'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <div className='w-xl'>
                    <select
                        value={socialMedia}
                        onChange={(e) => {
                            const res = socialMedias.find((item) => item === e.target.value);
                            if (res) setSocialMedia(res as SocialMedia);
                        }}
                        className='focus:ring-opacity-50 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500'>
                        <option value='' disabled>
                            -- Select one --
                        </option>
                        {socialMedias.map((item) => (
                            <option key={item} value={item} className='bg-gray-900 text-white'>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className={`rounded-lg px-4 py-2 transition ${
                        username.trim() === ''
                            ? 'cursor-not-allowed bg-gray-500 text-gray-300'
                            : 'bg-green-600 text-white hover:bg-green-500'
                    }}`}
                    onClick={() => handleButtonOK()}
                    disabled={!disabled && username.trim() === ''}>
                    OK
                </button>
                <button
                    className={`flex h-10 items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500`}
                    onClick={() => handleButtonSearch()}>
                    <FaSearch className='text-sm' />
                </button>
            </div>
        </>
    );
};

export default TrackerForm;
