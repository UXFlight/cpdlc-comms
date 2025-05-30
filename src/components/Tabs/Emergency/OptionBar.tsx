export default function OptionBar() {
  const handleRequest = (requestType: string) => {
    // Handle the request based on the type
    console.log(`Request type: ${requestType}`);
    // Here you can add logic to handle the request, e.g., send it to a server or update state
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
