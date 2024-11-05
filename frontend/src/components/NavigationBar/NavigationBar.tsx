import { Box, Title } from '@mantine/core';
import SignOutButton from '~/components/SignOutButton';

const NavigationBar = () => {
  return (
    <Box className="flex justify-between p-4 border-b-1 bg-green-800">
      <Title size={24} className="text-white">
        MRF Generator
      </Title>
      <SignOutButton className="ml-auto" />
    </Box>
  );
};

export default NavigationBar;
