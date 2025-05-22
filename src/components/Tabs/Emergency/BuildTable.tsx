import Input from "./Input";

export default function BuildTable() {
  return (
    <div className="container flex  flex-col items-start w-[568px] h-auto px-[15.5px] py-[16px]">
      <div className="emergency-div">
        <p className="emergency-text">Emergency Type</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Reason</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Divert to</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Descend to ALT</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Offset to</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Seouls/Fuel (HH:MM)</p>
        {/*slide options*/}
      </div>
      <div className="emergency-div">
        <p className="emergency-text">Remarks</p>
        {/*slide options*/}
      </div>
      <div className="w-full h-auto">
        <Input />
      </div>
    </div>
  );
}
