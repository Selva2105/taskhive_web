import MainLoader from "@/components/pages/Loader/main-loader";

export default function Loading() {

  return (
    <div className="flex items-center justify-center h-screen w-full text-3xl font-bold text-primary">
      <MainLoader />
    </div>
  );
}