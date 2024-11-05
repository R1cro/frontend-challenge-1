import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '~/stores/AuthStore';
import { Button, ButtonProps } from '@mantine/core';
import { AuthApi } from '~/api/auth';

type SignOutButtonProps = Omit<ButtonProps, 'onClick' | 'loading' | 'disabled'>;

const SignOutButton: React.FC<SignOutButtonProps> = observer((props) => {
  const { setAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthApi.signOut();
      setAuthenticated(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setAuthenticated]);

  return (
    <Button variant="filled" {...props} loading={isLoading} onClick={handleLogout}>
      Sign Out
    </Button>
  );
});

export default SignOutButton;
