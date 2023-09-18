import Spinner from "components/common/spinner";

export default function PageLoading() {
  return (
    <div className="min-h-screen py-8">
      <Spinner label="Loading" />
    </div>
  );
}
