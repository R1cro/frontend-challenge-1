import React from 'react';
import { Box, Button, Modal } from '@mantine/core';
import UploadForm from '~/components/UploadForm';
import { useToggle } from '@mantine/hooks';

const UploadSection: React.FC = () => {
  const [isOpen, handleToggle] = useToggle();
  return (
    <Box>
      <Button onClick={() => handleToggle()}>Upload TIC CSV file</Button>
      <Modal title="Upload TIC CSV file" size="70%" opened={isOpen} onClose={handleToggle}>
        <UploadForm onSubmit={handleToggle} />
      </Modal>
    </Box>
  );
};

export default UploadSection;
