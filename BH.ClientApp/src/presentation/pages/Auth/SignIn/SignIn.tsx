import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../../infrastructure/api/AccountApiSlice';
import { ILoginRequest } from '../../../../domain/interfaces/LoginModel';
import { useAppSelector } from '../../../../application/Redux/store/store';
import BackdropLoader from '../../../components/BackdropLoader';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
  const { register, getValues, handleSubmit } = useForm();
  const navigate = useNavigate();
  const lastSavedRoute = useAppSelector((state) => state.lastRoute.from);

  const [logIn, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged In Successfully');
      navigate(lastSavedRoute || '/');
    } else if (isError) {
      const loginError = localStorage.getItem('loginError');
      if (loginError) {
        const errorData = JSON.parse(loginError);
        toast.error(
          errorData?.data?.message
            ? `Status: ${errorData.status} - ${errorData.data.message}`
            : 'Something went wrong'
        );
        localStorage.removeItem('loginError');
      }
    }
  }, [isLoading, isError, isSuccess]);

  const btnSignIn = async (data: any) => {
    const { userName, password } = data;

    if (!userName) {
      toast.info('You have to enter your user name');
      return;
    }

    if (!password) {
      toast.info('You have to enter your password');
      return;
    }

    const sendingObj: ILoginRequest = { userName, password };
    await logIn(sendingObj);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login flex-1 flex flex-col justify-center items-center">
      {isLoading && (
        // <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        //   <div className="rounded-full h-12 w-12 border-4 border-t-4 border-white-500 animate-ping"></div>
        // </div>
        <BackdropLoader />
      )}

      <div className="formSection w-full flex justify-center">
        <form
          onSubmit={handleSubmit(btnSignIn)} // Using handleSubmit from react-hook-form
          className="formContent mt-24 w-full max-w-md border p-10 rounded-lg bg-slate-50"
        >
          <div className="formHeader mb-10">
            <h3 className="font-bold text-2xl">Login</h3>
            <h6>to get started</h6>
          </div>
          <div className="formInputs flex flex-col gap-5">
            {/* <input
              type="text"
              id="userName"
              className="p-2 border rounded-lg"
              placeholder="abrar@example.com"
              {...register('userName')}
              required
            /> */}
            <TextField
              error={isError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name or Email"
              autoComplete="email"
              {...register('userName')}
              // autoFocus
            />
            {/* <input
              type="password"
              id="password"
              className="p-2 border rounded-lg"
              placeholder="Please Enter Your Password"
              required
              {...register('password')}
            /> */}
            <TextField
              error={isError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              {...register('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-8 p-2 bg-blue-500 text-white rounded-lg w-full"
          >
            Sign In
          </button>
          {isError && (
            <div className="error mt-2 text-red-500">
              Login failed. Please try again.
            </div>
          )}
          {/* <div className="forgotPassword mt-10 flex flex-col gap-2">
            <a href="#">Forgot Password?</a>
            <p className="font-light">Problem? Contact Us.</p>
          </div> */}
          <div className="mt-4">
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
