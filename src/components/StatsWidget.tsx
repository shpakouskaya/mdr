// components/StatsWidget.tsx
import React from "react";

const StatsWidget: React.FC = () => {
    const stats = [
        { label: "R1C", value: 717 },
        { label: "R2C", value: 430 },
        { label: "R3C", value: 33.8 },
    ];

    return (
        <div className="  left-4 bg-black/50 p-4 border border-gray-600">
            <h2 className="mb-2 text-sm">Metrics</h2>
            <ul>
                {stats.map((stat, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">{stat.label}</span>
                        <span>{stat.value}</span>
                    </li>
                ))}
            </ul>
            {/* Optionally add a mini chart or bars */}
        </div>
    );
};

export default StatsWidget;
