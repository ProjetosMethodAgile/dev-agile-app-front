type InputProps = {
  text: string;
};

export default function FormInput({ text }: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor="email">{text}</label>
      <input id="email" type="text" className="w-full" name="email" />
    </div>
  );
}
