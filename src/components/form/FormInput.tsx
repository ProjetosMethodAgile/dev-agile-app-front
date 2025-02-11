type InputProps = {};

export default function FormInput() {
  return (
    <div className="w-full">
      <label htmlFor="email">Email:</label>
      <input id="email" type="text" className="w-full" name="email" />
    </div>
  );
}
