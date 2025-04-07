import { PermissoesRole } from "@/types/api/apiTypes";
import { act } from "react";

export default function PermissionsNavigationForm({
  children,
  permissionsData,
  setActiveTab,
  activeTab,
}: {
  permissionsData: PermissoesRole[];
  children: React.ReactNode;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}) {
  return (
    <nav className="flex-col">
      <div className="flex gap-4">
        {permissionsData &&
          permissionsData.map((screen) => {
            if (screen.parent_id === null) {
              return (
                <h3
                  onClick={() => setActiveTab(screen.id)}
                  className={`cursor-pointer hover:text-primary-50 text-xl font-semibold ${activeTab === screen.id ? "text-primary-50 border-b-2" : "text-gray-600"}`}
                  key={screen.nome}
                >
                  {screen.nome}
                </h3>
              );
            }
          })}
      </div>
      <div className="flex  flex-col p-3 text-lg">{children}</div>
    </nav>
  );
}
