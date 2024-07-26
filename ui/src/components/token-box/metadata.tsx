// Balance, Amount in USD and slippage for the swapped token

export default function Metadata() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-muted-foreground font-medium text-sm">
          $150.67 <span className="text-primary">(0.12%)</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Balance: <span className="text-foreground font-bold"> 0.2 ETH </span>
        </p>
      </div>
    </>
  );
}
