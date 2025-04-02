import React, { useState } from "react";

const StatsWidget: React.FC = () => {
    const [hoveredBox, setHoveredBox] = useState<number | null>(null);

    const stats = [
        { id: 0, containerName: "1", percentage: 34 },
        { id: 1, containerName: "2", percentage: 56 },
        { id: 2, containerName: "3", percentage: 0 },
        { id: 3, containerName: "4", percentage: 90 },
        { id: 4, containerName: "5", percentage: 42 },
    ];

    return (
        <div className="flex justify-around align-baseline border-t border-gray-600">
            {stats.map((stat) => (
                <div
                    key={stat.id}
                    className="flex flex-col items-center p-4 w-1/6"
                    // Set hoveredBox to this stat's ID on hover
                    onMouseEnter={() => setHoveredBox(stat.id)}
                    onMouseLeave={() => setHoveredBox(null)}
                >
                    {/* Container name with the line on top */}
                    <div className="relative font-bold border-2 mb-5 w-full text-center">
                        {stat.containerName}

                        {/* Single line with two states: horizontal (default) or vertical (hover) */}
                        <div
                            className={`absolute bg-[#8cdefd] transition-all duration-200
                            ${hoveredBox === stat.id
                                ? // HOVERED: vertical
                                "w-[2px] h-[50px] left-[-2px] top-[-50px]"
                                : // NOT HOVERED: horizontal
                                "w-[50%] h-[2px] left-0 top-[-2px]"
                            }
                        `}
                        />
                        {/* Another line on the right side (stays horizontal, presumably) */}
                        <div
                            className={`absolute bg-[#8cdefd] transition-all duration-200
                             ${hoveredBox === stat.id
                                ? // HOVERED: vertical
                                "w-[2px] h-[50px] left-[100%] top-[-50px]"
                                : // NOT HOVERED: horizontal
                                "w-[50%] h-[2px] left-1/2 top-[-2px]"
                                 }
                            `}
                            />
                        </div>

                    {/* Progress bar */}
                    <div className="relative font-bold border-2 mb-5 w-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#8cdefd]"
                            style={{ width: `${stat.percentage}%` }}
                        />
                        <div
                            className="relative z-10 font-bold pl-2"
                            style={
                                stat.percentage >= 10 ? { color: "#0d0b18" } : { color: "#8cdefd" }
                            }
                        >
                            {stat.percentage}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsWidget;
