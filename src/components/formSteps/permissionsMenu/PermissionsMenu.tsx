// import { PermissaoCompletaData } from "@/types/api/apiTypes";
// import React, { useState } from "react";
// import PermissionsScreen from "./screen/PermissionsScreen";

// type PermissionsMenuProps = {
//   permissoesData: PermissaoCompletaData[];
// };

// export default function PermissionsMenu({
//   permissoesData,
// }: PermissionsMenuProps) {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [screens, setScreens] = React.useState<PermissaoCompletaData[] | []>(
//     () => {
//       return permissoesData.filter((permissao) => permissao.parent_id === null);
//     },
//   );
//   const [subScreens, seetSubScreens] = React.useState<
//     PermissaoCompletaData[] | []
//   >(() => {
//     return permissoesData.filter((permissao) => permissao.parent_id !== null);
//   });

//   return (
//     <div className="col-span-full">
//       <PermissionsScreen
//         screens={screens}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         subscreens={subScreens}
//       />
//     </div>
//   );
// }
