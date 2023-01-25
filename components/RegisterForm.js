import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {useForm, Controller} from 'react-hook-form';

const RegisterForm = () => {
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur', // When the user leaves the field it validates the field right away. The default is onSubmit
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    // const data = {username: 'sebu', password: 'sebu1234'};
    try {
      const registerResult = await postUser(registerData);
      console.log('registration result', registerResult);
    } catch (error) {
      console.error('register', error);
      // TODO: notify user about failed login attempt
    }
  };

  const checkUser = async (username) => {
    const userAvailable = await checkUsername(username);
    console.log('checkUser', userAvailable);
    return userAvailable || 'Username is already taken';
  };

  return (
    <View>
      <Text>Registration form</Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3, validate: checkUser}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required.</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters.</Text>
      )}

      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 char) is required.</Text>}

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required.</Text>}

      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text>min length is 3 characters.</Text>
      )}
      <Button title="Sign in!" onPress={handleSubmit(register)} />
    </View>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
