import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const M_PHONE_NUMBER = 'phone_number';
export const M_EMAIL = 'email';
export const METHOD_KEY = 'login_method';
export const USERNAME_KEY = 'username';
export const REFRESH_KEY = 'refresh_tok';
export const REFRESH_KEY_EXP = 'refresh_tok_exp';



export const requestMobileOTP = createAsyncThunk('auth/mobileotp', async (phoneNumber, thunkAPI) => {
  try {
    const response = await axios.post('/api/auth/mobile/', { phone_number: phoneNumber });
    return { method: M_PHONE_NUMBER, username: phoneNumber, ...response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.response.data });
  }
});

// export const requestEmailOTP = createAsyncThunk('auth/emailotp', async (email, thunkAPI) => {
//   try {
//     const response = await axios.post('/api/auth/email', { email });
//     return { method: M_EMAIL, username: email, ...response.data };
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.response.data });
//   }
// });



const internalInitialState = {
  username: null,
  method: null,
  accessToken:null,
  refreshToken:null,
  error:null,
  me:null //user information => name,lastname....
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // Mobile OTP
    builder.addCase(requestMobileOTP.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.method = action.payload.method;
      state.loading = IDLE;

      return state;
    });
    builder.addCase(requestMobileOTP.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
      }),
      // throw new Error(action.error);
    );
    builder.addCase(requestMobileOTP.pending, (state) => {
      state.loading = LOADING;
      return state;
    });

    // Email OTP
    // builder.addCase(requestEmailOTP.fulfilled, (state, action) => {
    //   state.username = action.payload.username;
    //   state.method = action.payload.method;
    //   state.loading = IDLE;

    //   return state;
    // });
    // builder.addCase(requestEmailOTP.rejected, (state, action) => ({
    //   ...state,
    //   loading: IDLE,
    //   error: action.payload.error,
    //   }),
     
    // );
    // builder.addCase(requestEmailOTP.pending, (state) => ({
    //   ...state,
    //   loading: LOADING,
    // }));

    
   
  },
});

export const { reset, updateAccessToken } = authSlice.actions;