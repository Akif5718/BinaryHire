/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import logo from '../../../assets/data/logo.png';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine';
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../../../public/apiConfig.json';
import { setPanelShow } from '../../../../application/Redux/slices/ShowPanelSlice';
import { setNavbarShow } from '../../../../application/Redux/slices/ShowNavbarSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../application/Redux/store/store';
import { useLoginMutation } from '../../../../infrastructure/api/AccountApiSlice';
import { ILoginRequest } from '../../../../domain/interfaces/LoginModel';
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

type Props = {};

const SignIn = (props: Props) => {
  const { register, getValues, reset, control, setValue } = useForm();
  const navigate = useNavigate();
  const lastSavedRoute = useAppSelector((state) => state.lastRoute.from);
  const [formData, setFormData] = useState({ userName: '', password: '' });

  const [
    logIn,
    {
      isLoading: isLoginLoading,
      isError: isLoginError,
      error: errorMessage,
      isSuccess: isLoginSuccess,
      data: loginResponse,
    },
  ] = useLoginMutation();

  useEffect(() => {
    if (isLoginSuccess) {
      // setLoaderSpinnerForThisPage(false);
      toast.success('Logged In Successfully');
      navigate(`${lastSavedRoute || '/'}`);
    } else if (isLoginError) {
      // setLoaderSpinnerForThisPage(false);
      const loginError = localStorage.getItem('loginError');
      if (loginError) {
        const errorData = JSON.parse(loginError);
        if (errorData.data.message) {
          toast.error(
            `Status: ${errorData.status} - ${errorData.data.message}`
          );
        } else {
          toast.error('Something went wrong');
        }
        localStorage.removeItem('loginError');
      }
    }
  }, [
    isLoginLoading,
    isLoginError,
    errorMessage,
    isLoginSuccess,
    loginResponse,
  ]);

  // const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  dispatch(setNavbarShow(true));
  // dispatch(setPanelShow(true));

  const [init, setInit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      // await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const btnSignIn = () => {
    if (!getValues().userName) {
      toast.info('You have to enter your user name');
      return;
    }
    if (!getValues().password) {
      toast.info('You have to enter your password');
      return;
    }

    const sendingObj: ILoginRequest = {
      userName: getValues().userName,
      password: getValues().password,
    };
    logIn(sendingObj);
  };

  // password eye button to show/hide pass
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login flex-1 flex flex-col justify-center items-center">
        {isLoginLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping"></div>
          </div>
        )}
        {/* <div className="headerSection mx-10 mt-5 mb-10">
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="BinaryHire Logo"
                className="object-contain h-24 w-24"
              />
            </Link>
          </div>
        </div> */}
        <div className="formSection  w-full flex justify-center">
          <form
            onSubmit={btnSignIn}
            className="formContent mt-24 w-full max-w-md border p-10 rounded-lg bg-slate-50"
          >
            <div className="formHeader mb-10">
              <h3 className="font-bold text-2xl">Login</h3>
              <h6>to get started</h6>
            </div>
            <div className="formInputs flex flex-col gap-5">
              <input
                type="text"
                id="userName"
                className="p-2 border rounded-lg"
                placeholder="abrar@example.com"
                {...register('userName')}
                required
                // onChange={(e) =>
                //   setFormData({ ...formData, userName: e.target.value })
                // }
              />
              <input
                type="password"
                id="password"
                className="p-2 border rounded-lg"
                placeholder="Please Enter Your Password"
                required
                {...register('password')}
                // onChange={(e) =>
                //   setFormData({ ...formData, password: e.target.value })
                // }
              />
            </div>
            <button className="mt-8 p-2 bg-blue-500 text-white rounded-lg w-full">
              Login
            </button>
            {isLoginError && (
              <div className="error mt-2 text-red-500">{isLoginError}</div>
            )}
            <div className="forgotPassword mt-10 flex flex-col gap-2">
              <a href="#">Forgot Password?</a>
              <p className="font-light">Problem? Contact Us.</p>
            </div>
          </form>
        </div>
      </div>
    </>

    // return wrapper div--/--
  );
};

export default SignIn;
