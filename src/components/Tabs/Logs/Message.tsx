export default function Message() {
  return (
    <div className="flex">
      <img src="/up-arrow.svg" alt="arrow" className="w-[22px] h-[22px] mt-[10px]"></img>
      <div className="container flex flex-col items-start">
        <div className="flex items-center w-full gap-1">
            <span className="uppercase">from</span>  {/*source a voir selon le format de la reception*/}
            <span>CYUL</span>  
        </div>
      </div>
    </div>
  );
}
