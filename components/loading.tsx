export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00843D]"></div>
      </div>
    );
  }