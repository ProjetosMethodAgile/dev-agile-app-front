// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/context/userContext";
import getUser from "@/actions/getUser";
import BlurCircle from "@/components/background/BlurCircle";

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
        <body className="bg-primary-900 ">
          <BlurCircle positionX="24px" positionY="16px" />
          {children}
        </body>
      </html>
    </UserContextProvider>
  );
}
