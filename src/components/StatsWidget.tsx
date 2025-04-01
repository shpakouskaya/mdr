// components/StatsWidget.tsx
import React from "react";

const StatsWidget: React.FC = () => {
    const stats = [
        { id: 0, containerName: '1', percentage: 34 },
        { id: 1, containerName: '2', percentage: 56 },
        { id: 2, containerName: '3', percentage: 0 },
        { id: 3, containerName: '4', percentage: 90 },
        { id: 4, containerName: '5', percentage: 42 },
    ];

    return (
        <div className="flex justify-around align-baseline border-t border-gray-600">
            {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center p-4 w-1/6">
                    <div className="font-bold border-2 mb-5 w-full text-center">{stat.containerName}</div>
                    <div className="relative font-bold border-2 mb-5 w-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#8cdefd]"
                            style={{ width: `${stat.percentage}%` }}
                        ></div>
                        {/* Show percentage text */}
                        <div className={"relative z-10 font-bold pl-2"}
                            style={
                                stat.percentage >= 10 ? { color: '#0d0b18' } : { color: '#8cdefd' }
                            }>
                            {stat.percentage}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsWidget;
