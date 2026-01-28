import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from 'next/app';
import '../utils/i18n'; // Initialize i18n
import { SiteSettingsProvider } from '../context/SiteSettingsContext';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import SellerAIChat from '../components/ui/SellerAIChat';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteSettingsProvider>
      <ThemeProvider>
        <Component {...pageProps} />
        <SellerAIChat />
        <ThemeToggle />
      </ThemeProvider>
    </SiteSettingsProvider>
  );
}
