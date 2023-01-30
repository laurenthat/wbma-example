import React from 'react';
import {View} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Input, Button, Card} from '@rneui/base';
// import {useAuthentication} from '../hooks/ApiHooks';

const EditProfile = () => {
  // const {setIsLoggedIn, setUser} = useContext(MainContext);
  // const {postLogin} = useAuthentication();

  const {putUser, checkUsername} = useUser();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur', // When the user leaves the field it validates the field right away. The default is onSubmit
  });

  const edit = async (registerData) => {
    delete registerData.confirmPassword;
    console.log('Registering: ', registerData);
    // const data = {username: 'sebu', password: 'sebu1234'};
    try {
      const registerResult = await putUser(registerData);
      console.log('registration result', registerResult);
    } catch (error) {
      console.error('register', error);
      // TODO: notify user about failed login attempt
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('checkUser', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Edit profile details</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {value: 3, message: 'Minimum length is 3 characters'},
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            if (value === getValues('password')) {
              return true;
            } else {
              return 'password must match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'email is required'},
          pattern: {
            value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'Must be at least 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />
      <Button title="Edit data!" onPress={handleSubmit(edit)} />
    </Card>
  );
};

export default EditProfile;
