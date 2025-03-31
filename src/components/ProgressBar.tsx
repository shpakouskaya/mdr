// components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
    value: number;
    max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
    const percentage = (value / max) * 100;

    return (
        <div className="w-32 h-2 bg-gray-700 relative">
            <div
                className="bg-green-400 h-2 absolute left-0 top-0"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
