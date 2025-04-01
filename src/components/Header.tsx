import * as React from "react";
import LumonLogo from "./LumonLogo.tsx";

const Header: React.FC = () => {
    const funnyName = "Milkshake";
    const completion = 0;

    return (
        <header className="flex w-full relative items-center justify-between py-8 px-12 border-b border-gray-600">
            <div className="header-container w-[91%] flex items-center justify-between py-1 px-2 border-2 border-r-0">
                <a className="text-4xl" target="_blank" href="https://www.youtube.com/watch?v=VngE9BiEe7Q">{funnyName}</a>
                <div className="flex items-center space-x-4 mr-20">
                    <span className="text-lg">{completion}% Complete</span>
                    <LumonLogo/>
                </div>
            </div>
        </header>
    );
};

export default Header;