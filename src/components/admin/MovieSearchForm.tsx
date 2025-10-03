export type MovieSearchProps = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    mediaType: 'movie' | 'tv';
    setMediaType: (type: 'movie' | 'tv') => void;
};

const MovieSearchForm = ({ searchTerm, setSearchTerm, mediaType, setMediaType }: MovieSearchProps) => {
    return (
        <div className='flex items-center gap-2'>
            {/* Search Card */}
            <div className='relative flex-1 rounded-xl bg-gray-900 p-3 shadow-md'>
                <img
                    src='/images/search.svg'
                    alt='search'
                    className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400'
                />
                <input
                    type='text'
                    placeholder='Search through thousands of movies'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className='w-full rounded-lg bg-gray-900 py-3 pr-4 pl-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none'
                />
            </div>

            {/* Media Type Card */}
            <div className='rounded-xl bg-gray-900 p-3 shadow-md'>
                <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'movie' | 'tv')}
                    className='rounded-lg bg-gray-900 px-4 py-3 text-white focus:ring-2 focus:ring-green-600 focus:outline-none'>
                    <option value='movie'>Movie</option>
                    <option value='tv'>TV Series</option>
                </select>
            </div>
        </div>
    );
};

export default MovieSearchForm;
