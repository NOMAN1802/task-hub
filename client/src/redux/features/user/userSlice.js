import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import auth from '../../../utils/firebase.config';
import { saveUser } from '../api/auth';


const initialState = {
  name: '',
  email: '',
  photoURL: '',
  isLoading: true,
  isError: false,
  error: '',
};

export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, displayName,photoURL }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {
    displayName: displayName,
    photoURL: photoURL
  });
  console.log(data);
  // Save additional user data to the database
  const userData = {
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
      email: data.user.email,
   
  };

  // Save user data to the database
  saveUser(userData);
  return userData
});

export const loginUser = createAsyncThunk('userSlice/loginUser', async ({ email, password,photoURL }) => {
  const data = await signInWithEmailAndPassword(auth, email, password,photoURL);
  console.log(data);
  return {
    email: data.user.email,
    name: data.user.displayName,
    photoURL: data.user.photoURL,
  };
});

export const signInWithGoogle = createAsyncThunk('userSlice/signInWithGoogle', async () => {
  const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Perform any additional actions if needed, such as updating the user profile.
    const user = result.user;
    const userData = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    };
    saveUser(userData);
    return userData;
  
});


const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
    },
   
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.photoURL = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = '';
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.photoURL = payload.photoURL;
        state.error = '';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.photoURL = payload?.photoURL;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = action.error.message;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = '';
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.photoURL = payload.photoURL;
        state.error = '';
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = '';
        state.name = '';
        state.photoURL = '';
        state.error = action.error.message;
      });

  },
});

export const { setUser, toggleLoading, logout } = userSlice.actions;
export default userSlice.reducer;
