import { LoadingButton } from '@mui/lab';
import { Card, TextField, Typography, Stack, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';


type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' }});

  const validationRules = {
    email: {
      required: 'Enter your email address',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Enter your password',
    },
  };


  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
    const headers = { 'Content-Type': 'application/json'};

    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;

    try {
      setIsPending(true);
      await axios.get(baseUrl + '/sanctum/csrf-cookie');

      const res = await axios.post(baseUrl + '/login', data, {
        headers: headers,
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box sx={{ backGroundColor: 'e6f2ff', height: '100vh' }}>
      <Grid container>
        <Grid 
          size={{ xs: 12, lg: 12 }} 
          style={{ maxWidth: '500px' }} 
          sx={{ margin: 'auto', pt: 20 }}
        >
          <Card sx={{ p: 2, mx: 2, borderRadius: 3}}>
            <Box 
              sx={{ 
                py: 1, 
                display: 'flex', 
                justifyContent: 'center', 
                justifyItems: 'item' 
              }}
            >
              <Typography>Login</Typography>
            </Box>
            <Stack 
              component="form" 
              onSubmit={handleSubmit(onSubmit)}
              spacing={2}
            >
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message}
                    label="Email"
                    size="small"
                    sx={{ backgroundColor: 'white' }}
                    type="text"
                  />
                )}
                rules={validationRules.email}
              />
              <Controller
                control={control}
                name='password'
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    helperText={fieldState.error?.message}
                    label="Password"
                    size="small"
                    sx={{ backgroundColor: 'white' }}
                    type="password"
                  />
                )}
                rules={validationRules.password}
              />
              <LoadingButton
                loading={isPending}
                type='submit'
                variant='contained'  
              >
                ログイン
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
