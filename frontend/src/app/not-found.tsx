export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <div className="mx-auto max-w-md bg-slate-100 min-h-svh relative flex flex-col justify-center items-center">
        <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full pb-20">
          <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
              404
            </h1>
            <p className="mt-3 text-gray-600">該当のページが見つかりません</p>
          </div>
        </div>
      </div>
    </>
  );
}
