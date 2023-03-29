import { useRouter } from 'next/router';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search: FC = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  const onSubmit = () => {
    if (search.trim().length) {
      router.push(`/q?term=${search.trim()}`);
    }
  };

  return (
    <div className='relative flex items-center w-full sm:px-2 shrink'>
      <input
        type='text'
        value={search}
        placeholder='Search...'
        onChange={changeHandler}
        onKeyDown={onEnter}
        className='text-white bg-black w-full py-2 px-6 placeholder:text-grey rounded-lg'
      />
      <button
        onClick={onSubmit}
        className='absolute right-0 top-0 flex items-center justify-center text-white bg-primary rounded-r-lg h-full w-10 z-20'
      >
        <AiOutlineSearch size={28} />
      </button>
    </div>
  );
};

export default Search;
