export default function ResetHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center text-2xl font-semibold leading-loose">Set new password</h1>
      <p className="text-center text-gray-50">Your new password must be different to previously used passwords.</p>
    </div>
  );
}
