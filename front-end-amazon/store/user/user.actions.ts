import { removeFromStorage, saveToStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorCatch } from './../../api/api.helper';
import { IAuthResponse, IEmailPassword } from './user.interface';

export const register = createAsyncThunk<IAuthResponse,IEmailPassword>(
  'auth/register',
  async (data,thunkApi) => {
    try {
      const response = await AuthService.main('register', data)

      if(response) saveToStorage(response)

      return response
    } catch (err) {
      return thunkApi.rejectWithValue(err)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse,IEmailPassword>(
  'auth/login',
  async (data,thunkApi) => {
    try {
      const response = await AuthService.main('login', data)

      if(response) saveToStorage(response)

      return response
    } catch (err) {
      return thunkApi.rejectWithValue(err)
    }
  }
)

export const logout = createAsyncThunk('auth/lohout',() => {
  removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>('auth/check-auth',async (_ , thunkApi) => {
  try {
    const response = await AuthService.getNewToken()
    return response.data
  } catch (err) {
    if(errorCatch(err)==='jwt expired'){
      thunkApi.dispatch(logout())
    }
    
    return thunkApi.rejectWithValue(err)
    
  }
})