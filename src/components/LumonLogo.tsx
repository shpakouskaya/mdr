import React from "react";
import Logo from './../assets/logoBG.png'

const LumonLogo: React.FC = () => {
    // Could return an <img> or inline <svg>
    return (
        <a href="https://lumon.industries" target="_blank" className="absolute ml-4 right-8 z-100">
            <img className="w-[180px]" src={Logo} alt="logo"/>
        </a>
    );
};

export default LumonLogo;
