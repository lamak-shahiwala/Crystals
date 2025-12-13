export default function Header() {
  return (
    <header className="w-full flex justify-center">
      <div className="w-full max-w-6xl p-4">
        <div
          className="relative rounded-3xl overflow-hidden h-[82vh]"
          style={{
            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.9)",
          }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/header-cover.png')",
            }}
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="text-center px-6 md:px-12">
              <h1 className="text-white text-5xl md:text-7xl font-title font-bold leading-tight">
                The Appcoin
                <br />
                <span className="inline-block">Launchpad.</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
