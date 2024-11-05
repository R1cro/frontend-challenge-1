import { Center, Container } from '@mantine/core';
import { AuthForm } from '~/components/AuthForm';

function SignInPage() {
  return (
    <Container className="w-full h-full">
      <Center className="w-full h-full">
        <AuthForm />
      </Center>
    </Container>
  );
}

export default SignInPage;
