export default function FormRemember() {
  return (
    <div className="flex gap-2 justify-center *:cursor-pointer">
        <input  id="remember" name="remember" type="checkbox" />
        <label htmlFor="remember">Lembrar-me</label>
    </div>
  );
}