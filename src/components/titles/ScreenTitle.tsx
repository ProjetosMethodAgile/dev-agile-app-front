import { User2 } from "lucide-react";

type ScreenTitleProps = { 
    title: string;
    icon: React.ElementType;
}


export default function ScreenTitle({ title, icon: Icon }: ScreenTitleProps) {
  return (
    <h1 className="text-4xl font-semibold flex items-center gap-2 text-general mb-6">
      <Icon className="size-8"/>
      {title}
    </h1>
  );
}
