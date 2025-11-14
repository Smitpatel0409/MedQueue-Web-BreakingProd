'use client';

import { Provider } from 'react-redux';
import { rtkStore } from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={rtkStore}>{children}</Provider>;
}
