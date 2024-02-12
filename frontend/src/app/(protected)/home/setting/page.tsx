"use client";

import { authSelector } from '@/store/slices/authSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {}

const SettingPage = (props: Props) => {
  // --- Redux ---
  const dispatch = useDispatch();
  const authReducer = useSelector(authSelector);



  return (
    <div>SettingPage</div>
  )
}

export default SettingPage