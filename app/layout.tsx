import '../styles/globals.css';
import './globals.css';

export const metadata = {
  title: 'Cognitive Synapse | A Blueprint of a Mind',
  description: '身心合一的智造者 - 曾德荣的个人作品集',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/placeholder-logo.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
