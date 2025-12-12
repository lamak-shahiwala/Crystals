export default function GeckoTerminal() {
  return (
    <iframe
      id="geckoterminal-embed"
      title="GeckoTerminal Embed"
      src="https://www.geckoterminal.com/solana/pools/2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv?embed=1&info=0&swaps=0&light_chart=1&chart_type=price&resolution=5m&bg_color=f1f5f9"
      frameBorder="0"
      allow="clipboard-write"
      allowFullScreen
      className="w-full h-full"
    />
  );
}