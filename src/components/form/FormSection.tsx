import SectionTitle from "../titles/SectionTitle";


type FormSectionProps = {
    title?: string;
    children?: React.ReactNode;
}

export default function FormSection({ title,children }: FormSectionProps) {
    return <div className="grid grid-cols-3  gap-3 border-b-1 border-primary-300/20 pb-10">
        {title && <SectionTitle title={title} />}
        {children}
    </div>

}