// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/context/userContext";
import getUser from "@/actions/getUser";
import BlurCircle from "@/components/background/BlurCircle";
import ToggleTheme from "@/components/ui/button/ToggleTheme";

export const metadata: Metadata = {
  title: "DevAgile App",
  description: "Sistema em desenvolvimento",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUser();

  return (
    <UserContextProvider user={user}>
      <html lang="pt-BR">
        <body className="dark:bg-primary-900 relative bg-blue-100 text-black dark:text-white transition-colors">
          <BlurCircle className="-bottom-24 -left-24" />
          <BlurCircle className="-top-24 -right-24" />
          <ToggleTheme />
          {children}
        </body>
      </html>
    </UserContextProvider>
  );
}
