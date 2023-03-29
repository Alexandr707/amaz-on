import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import { FC } from 'react';

const HeaderProfile: FC = () => {
  const {profile} = useProfile()
  console.log(profile);
  

  if(!profile) return null

return <div>
  {!!profile?.avatarUrl &&(
    <Image
    width={43}
    height={43}
    src={profile.avatarUrl}
    alt='Profile'
    className='rounded-full border border-primary border-solid animate-opacity'
    />
  )}
</div>
}

export default HeaderProfile