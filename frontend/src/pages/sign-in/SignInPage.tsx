import { Center, Flex } from '@mantine/core';
import AuthForm from '~/components/AuthForm';

function SignInPage() {
  return (
    <Flex className="h-screen w-full bg-gray-100" gap="md" justify="center" direction="row">
      <Center>
        <AuthForm />
      </Center>
    </Flex>
  );
}

export default SignInPage;
