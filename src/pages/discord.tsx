import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DiscordRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('https://discord.gg/Fa6tRapUZ2');
  }, [router]);

  return null;
}
