export default function OptionBar() {
  const handleRequest = (requestType: string) => {
    console.log(`Request type: ${requestType}`);
  };

  return (
    <div className="flex justify-center items-center gap-[33px] w-full overflow-x-hidden px-[15.5px]">
      <div
        className="emergency-options bg-white-10"
        onClick={() => handleRequest("clear")}
      >
        clear
      </div>
      <div
        className="emergency-options bg-white-10"
        onClick={() => handleRequest("set")}
      >
        set
      </div>
      <div
        className="emergency-options bg-white-10 "
        onClick={() => handleRequest("cancel")}
      >
        cancel
      </div>
      <div
        className="emergency-options bg-white-10"
        onClick={() => handleRequest("send")}
      >
        send
      </div>
    </div>
  );
}
