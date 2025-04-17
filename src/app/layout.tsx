import { ReactNode } from 'react';
import './globals.css';
import MainHeader from './components/main-header/main-header';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

type RootLayoutProps = {
    children: ReactNode;
  };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <MainHeader/>
        {children}
      </body>
    </html>
  );
}
