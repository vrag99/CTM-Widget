import { Button } from "@/components/ui/button";

export default function FromAddress() {
  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <p className="text-lg">From</p>
        <Button className="rounded-full w-32" size={"sm"}>
          Connect Wallet
        </Button>
      </div>
    </>
  );
}
