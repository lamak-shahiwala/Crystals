export default function Header() {
  return (
    <header className="w-full flex justify-center py-6 lg:py-8 bg-bg">
      <div className="w-full max-w-7xl px-4 lg:px-6">
        <div
          className="
            relative overflow-hidden shadow-xl
            rounded-[2.5rem] lg:rounded-[3rem]
            p-6 lg:p-8
            h-[25vh] sm:h-[25vh] md:h-[30vh] lg:h-[40vh]
          "
        >
          {/* Background image for Desktop */}
          <div
            className="hidden lg:block absolute inset-0 bg-right bg-cover"
            style={{
              backgroundImage: "url('/images/header-cover.png')",
            }}
          />

          {/* Background image for Mobile */}
          <div
            className="block lg:hidden absolute inset-0 bg-right bg-cover"
            style={{
              backgroundImage: "url('/images/header-cover_mobile.png')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center md:pl-4">
            <div className="text-left px-4 sm:px-8 md:px-12">
              <h1
                className="
                  text-[#E4FA84] font-title font-bold leading-tight
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
