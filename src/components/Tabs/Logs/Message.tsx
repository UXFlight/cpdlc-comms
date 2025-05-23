import { UplinkMessages } from "../../../constants/messages";
import Time from "../../Time/time";

export default function Message() {
  return (
    <div className="flex justify-center items-center">
      <img src="/up-arrow.svg" alt="arrow" className="w-[22px] h-[22px] mb-[30px]"></img>
      <div className="container flex flex-col items-start w-[516px] h-[87px] p-[8px]">
        <div className="flex items-center w-full h-auto justify-between align-baseline">
          <div>
            <span className="uppercase text-white-40 font-medium tetx-[14px]">from</span>  {/*source a voir selon le format de la reception*/}
            <span className="ml-2 font-medium tetx-[14px]">CYUL</span> 
          </div>
          <div className="w-[37px] h-[17px] bg-white-10 rounded flex items-center justify-center">
            <span className="uppercase text-[14px] text-light-blue font-semibold">new</span> 
          </div>
        </div>
        <div className="-mt-1.5 flex items-center w-full h-auto justify-between align-baseline">
          <span className="font-semibold text-[16px] not-italic leading-norm text-secondary-blue self-stretch">{UplinkMessages.UM120.element}</span>
          <div>
            <Time/>
          </div>
        </div>
      </div>
    </div>
  );
}
