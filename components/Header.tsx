export default function Header() {
  return (
    <header className="w-full flex justify-center p-4 lg:pt-6 pb-2">
      <div
        className="
          w-full max-w-6xl p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-xl relative
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

        {/* OVERLAY: This element now carries the Inner Radius and the Inset Shadow
            to cover the background image area cleanly. */}
        <div
          className="absolute inset-0 bg-black/40 rounded-2xl"
          style={
            {
              // Applying the inset shadow directly to the overlay div
              // boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.9)",
            }
          }
        />

        <div
          className="
            relative w-full h-full
          "
        >
          {/* Text Content */}
          <div className="relative z-10 flex items-center justify-start w-full h-full md:pl-4">
            <div className="text-left px-4 sm:px-8 md:px-12">
              <h1
                className="
                  text-white font-title font-bold leading-tight
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
