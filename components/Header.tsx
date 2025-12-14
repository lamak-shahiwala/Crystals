export default function Header() {
  return (
    <header className="w-full flex justify-center">
      <div className="w-full max-w-6xl p-4 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
        <div
          className="
            relative rounded-2xl md:rounded-3xl overflow-hidden
            h-[25vh] sm:h-[25vh] md:h-[30vh] lg:h-[40vh]
          "
          style={{
            boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.9)",
          }}
        >
          {/* Background image for Desktop*/}
          <div
            className="hidden lg:block absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/header-cover.png')",
            }}
          />
          {/* Background image for Mobile*/}
          <div
            className="block lg:hidden absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/header-cover_mobile.png')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex items-center justify-start w-full h-full md:pl-4">
            <div className="text-left px-4 sm:px-8 md:px-12">
              <h1
                className="
                  text-bg font-title font-bold leading-tight
                  text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                "
              >
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
