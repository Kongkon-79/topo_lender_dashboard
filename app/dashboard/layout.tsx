import AuthProvider from "@/components/Providers/AuthProvider";
import "../globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}
