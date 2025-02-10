import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/context/userContext";
import getUser from "@/actions/getUser";

export const metadata: Metadata = {
  title: "DevAgile App",
  description: "Sistema em desenvolvimento",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUser();
  // console.log(data);

  return (
    <UserContextProvider user={data}>
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </UserContextProvider>
  );
}
