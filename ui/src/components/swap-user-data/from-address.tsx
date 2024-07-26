import { Button } from "../ui/button";

export default function FromAddress() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg">From</p> <Button className="rounded-full" size={"sm"}>Connect Wallet</Button>
      </div>
    </>
  );
}
