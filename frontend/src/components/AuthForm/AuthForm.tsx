import React, { useState, useCallback } from 'react';
import { TextInput, PasswordInput, Button, Title, Text, Card, Notification, Box } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '~/stores/AuthStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '~/validators/auth.validator';
import { AuthApi } from '~/api/auth';

type AuthFormData = z.infer<typeof authSchema>;

const AuthForm: React.FC = observer(() => {
  const { isAuthenticated, setAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        await AuthApi.signIn(data.username, data.password);
        setAuthenticated(true);
      } catch (error) {
        setError('We could not sign you in. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthenticated]
  );

  return (
    <Box className="w-full flex flex-col items-center gap-4">
      {error && (
        <Notification color="red" title="Oops">
          {error}
        </Notification>
      )}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title className="mb-2 text-center">Hi!</Title>
        <Text size="sm" mb="lg">
          Please enter your credentials to continue
        </Text>
        <Box mb="lg">
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
            <Button type="submit" variant="filled" fullWidth className="mt-2" disabled={isAuthenticated || isLoading} loading={isLoading}>
              Sign In
            </Button>
          </form>
        </Box>
      </Card>
    </Box>
  );
});

export default AuthForm;
