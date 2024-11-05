import React, { useState, useCallback } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Text, Card } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '~/stores/AuthStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '~/validators/auth.validator';

type AuthFormData = z.infer<typeof authSchema>;

const AuthForm: React.FC = observer(() => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<AuthFormData> = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        setAuthenticated(true);
      } catch (error) {
        alert('Invalid credentials');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthenticated]
  );

  return (
    <Box className="w-full max-w-md mx-auto">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title className="mb-2 text-center">Hi!</Title>
        <Text className="mb-4 text-center">Please enter your credentials to continue</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <TextInput label="Usename" placeholder="Enter your username" {...field} error={errors.username?.message ?? null} className="mb-4" />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => <PasswordInput label="Password" placeholder="Enter your password" {...field} error={errors.password?.message ?? null} className="mb-6" />}
          />
          <Button type="submit" variant="filled" color="indigo" fullWidth className="mt-6" disabled={isAuthenticated || isLoading} loading={isLoading}>
            Sign In
          </Button>
        </form>
      </Card>
    </Box>
  );
});

export default AuthForm;
