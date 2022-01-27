import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserData} from '../hook/UserManagement/useUserLogin';

interface Influencer {
  id: number;
  date_of_birth: string;
  gender: string;
  address: string;
  appartment: string;
  city: string;
  state: string;
  zip_code: number;
  profession: string;
  short_bio: string;
  long_bio: string;
  rate_per_job: number;
  rating: any;
  approved: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  blocked: any;
}

export const influencerKey = 'infleuncerKey';

export const userKey = 'userKey';
export interface IInfluencerState {
  influencer: Influencer | null; // -----Temp Added remove | null later on-----------------
  isLoggedIn: boolean;
  // used to show splash screen while user data is being loaded from async storage
  isLoadingStorageData: boolean;
  // if user is logging out by their own choice
  isLoggingOut: boolean;
  // or when the session is expired
  isSessionExpiredAndLoggingOut: boolean;
}
export interface IUserState {
  user: UserData | null; // -----Temp Added remove | null later on-----------------
  isLoggedIn: boolean;
  // used to show splash screen while user data is being loaded from async storage
  isLoadingStorageData: boolean;
  // if user is logging out by their own choice
  isLoggingOut: boolean;
  // or when the session is expired
  isSessionExpiredAndLoggingOut: boolean;
}
const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  // always true when app loads
  isLoadingStorageData: true,
  isLoggingOut: false,
  isSessionExpiredAndLoggingOut: false,
};

const initialInfluencerState: IInfluencerState = {
  influencer: null,
  isLoggedIn: false,
  // always true when app loads
  isLoadingStorageData: true,
  isLoggingOut: false,
  isSessionExpiredAndLoggingOut: false,
};

// WARNING https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810014208
// always add unique names to your createAsyncThunk calls !

const loadUserFromStorage = createAsyncThunk('user/loadFromStorage', () => {
  return AsyncStorage.getItem(userKey);
});

const loadInfluencerFromStorage = createAsyncThunk(
  'user/loadFromStorage',
  () => {
    return AsyncStorage.getItem(influencerKey);
  },
);

const logOutUser = createAsyncThunk('user/logoutUser', () => {
  console.log('User Logged Out');
  AsyncStorage.removeItem(influencerKey);
  return AsyncStorage.removeItem(userKey);
});

const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: UserData) => {
    await AsyncStorage.setItem(userKey, JSON.stringify(userData));
    return userData;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // use the builder pattern its easier to understand
  extraReducers: builder => {
    builder
    .addCase(
      loadUserFromStorage.fulfilled,
      (state, action: PayloadAction<any>) => {
        const { payload } = action;
        const user = payload;
        if (user) {
          state.isLoadingStorageData = false;
          state.isLoggedIn = true;
          state.user = user;
        } else {
          state.isLoadingStorageData = false;
          state.isLoggedIn = false;
          state.user = null;
        }
      }
    )
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          const {payload} = action;
          state.isLoggedIn = true;
          state.user = payload;
        },
      )
      .addCase(loadUserFromStorage.rejected, state => {
        state.isLoadingStorageData = false;
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

const loginInfluencer = createAsyncThunk(
  'influencer/userId',
  async (userData2: Influencer) => {
    await AsyncStorage.setItem(influencerKey, JSON.stringify(userData2));
    return userData2;
  },
);

const influencerSlice = createSlice({
  name: 'infleuncerKey',
  initialState: initialInfluencerState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loginInfluencer.fulfilled,
        (state, action: PayloadAction<Influencer>) => {
          const {payload} = action;
          state.isLoggedIn = true;
          state.influencer = payload;
        },
      )
      .addCase(loadUserFromStorage.rejected, state => {
        state.isLoadingStorageData = false;
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.influencer = null;
      });
  },
});

const userReducer = userSlice.reducer;
const influencerReducer = influencerSlice.reducer;
export {
  userReducer,
  loadUserFromStorage,
  logOutUser,
  loginUser,
  influencerReducer,
  loadInfluencerFromStorage,
  loginInfluencer,
};
