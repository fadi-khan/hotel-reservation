// src/lib/hooks/useAuth.ts
'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin, handleLogout } from '@/lib/store/authSlice';
import { httpService } from '@/lib/services/HttpService';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await httpService.get('/auth/profile'); // your API endpoint
        const profile = res.data;



        if (profile?.id) {
          dispatch(handleLogin({ user: profile }));
        } else {
          dispatch(handleLogout());
        }
      } catch (err) {
        dispatch(handleLogout());
      }
    };

    fetchProfile();
  }, [dispatch]);
};
