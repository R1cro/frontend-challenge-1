import { Flex, Center } from '@mantine/core';

const ScreenCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex className="h-screen w-full bg-gray-200" gap="md" justify="center" direction="row">
      <Center>{children}</Center>
    </Flex>
  );
};

export default ScreenCenter;
