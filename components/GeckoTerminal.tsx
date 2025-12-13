export default function GeckoTerminal() {
  return (
    <iframe
      id="geckoterminal-embed"
      title="GeckoTerminal Embed"
      src="https://www.geckoterminal.com/solana/pools/2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv?embed=1&info=0&swaps=0&light_chart=1&chart_type=price&resolution=5m&bg_color=FFFFFF"
      frameBorder="0"
      allow="clipboard-write"
      allowFullScreen
      className="w-full h-[60vh] lg:w-full lg:h-full px-5 py-5 border rounded-2xl"
    />
  );
}
