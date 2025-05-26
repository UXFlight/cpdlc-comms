export default function OptionBar() {

    const handleRequest = (action: string) => {
        switch (action) {
            case "standby":    
                console.log("Standby action triggered");
                break;  
            case "accept":
                console.log("Accept action triggered");
                break;
            case "reject":
                console.log("Reject action triggered");
                break;
            // case "load":
            //     console.log("Load action triggered");
            //     break;
            default:
                console.error("Unknown action:", action);
        }
    }

    return (
        <div className="flex justify-center w-full overflow-x-hidden">
            <div className="flex flex-row gap-[31px] border border-[2px] border-white-10 rounded-md items-center justify-around w-[538px] h-[74px] py-[16px] px-[15.5px] bg-nav-bar ">
                <div className="logs-options bg-white-10">
                    load
                </div>
                <div className="logs-options bg-white-10" onClick={()=>handleRequest("standby")}>
                    standby
                </div>
                <div className="logs-options bg-white-10 "  onClick={()=>handleRequest("accept")}>
                    accept
                </div>
                <div className="logs-options bg-white-10"  onClick={()=>handleRequest("reject")}>
                    reject
                </div>
            </div>
        </div>
    );
}