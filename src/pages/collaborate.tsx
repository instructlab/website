import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Collaborate = () => {
  const router = useRouter();

  useEffect(() => {
    window.location.href =
      'https://github.com/instructlab/community/blob/main/Collaboration.md';
  }, [router]);

  return null;
};

export default Collaborate;
