import './globals.css';

export const metadata = {
  title: 'Cognitive Synapse | A Blueprint of a Mind',
  description: '身心合一的智造者 - 曾德荣的个人作品集',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
