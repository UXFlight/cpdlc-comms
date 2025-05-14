import ResponsiveBar from "../components/ResponsiveAppBar/ResponsiveBar";
import ConnectionBar from "../components/ConnectionBar/ConnectionBar";
import FmsTable from "../components/Fms/FmsTable";

export default function App() { 
  return (
      <div className="grid lg:grid-cols-2 grid-cols-1 h-screen gap-8">
        <div className="flex justify-center items-center">
          <div className="w-[600px] h-[800px] relative bg-black overflow-hidden lg:block hidden">
            <FmsTable/>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto">
          <div className="w-[600px] h-[800px] relative bg-black overflow-hidden grid grid-rows-3">
            <div>
            <ResponsiveBar/>
            </div>
            <div>
            {/*login*/}
            </div>
            <div className="self-end">
            <ConnectionBar/>
            </div>
          </div>
        </div>
      </div>
  )
}

