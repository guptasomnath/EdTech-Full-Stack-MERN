import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { showDialog } from '@/Redux/slices/dialogSlice';
import { getUserInfo } from '@/utils/processUserInfo';
import { nameToAvaterText } from '@/utils/nameToAvaterText';

interface UserAccountBtnProps {
  setmobileNavVisibility : Dispatch<SetStateAction<string>>
}

const UserAccountBtn = ({ setmobileNavVisibility } : UserAccountBtnProps) => {
  const dispatch = useDispatch();
  const { name } = getUserInfo();
  const avaterText = nameToAvaterText(name || undefined);

  const onAccountBtnClick = () => {
    dispatch(showDialog("ProfileDialog"));
    setmobileNavVisibility("hidden");
  }
  
  return (
    <button
    onClick={onAccountBtnClick}
    className='rounded-full bg-gray-300 h-10 w-10'>
      { avaterText }
    </button>
  )
}

export default UserAccountBtn