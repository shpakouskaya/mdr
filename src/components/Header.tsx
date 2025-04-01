import * as React from "react";
// import ProgressBar from "./ProgressBar.tsx";
import LumonLogo from "./LumonLogo.tsx";

const Header: React.FC = () => {
    const location = "Minsk";
    const completion = 42;

    return (
        <header className="flex w-full relative items-center justify-between py-8 px-12 border-b border-gray-600">
            <div className="header-container w-[91%] flex items-center justify-between py-1 px-2 border-2 border-r-0">
                <div className="text-4xl">{location}</div>
                <div className="flex items-center space-x-4 mr-20">
                    <span className="text-lg">{completion}% Complete</span>
                    {/*<ProgressBar value={completion} max={100} />*/}
                    <LumonLogo/>

                </div>
            </div>
        </header>
    );
};

export default Header;