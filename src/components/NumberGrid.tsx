import React, { useState, useEffect } from "react";
import { SelectionArea, SelectionEvent } from "@viselect/react";
// import "viselect/dist/viselect.css";

const GRID_ROWS = 10;
const GRID_COLS = 20;

const NumberGrid: React.FC = () => {
    const [numbers, setNumbers] = useState<number[][]>([]);
    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    useEffect(() => {
        // Generate initial grid
        const initialGrid = Array.from({ length: GRID_ROWS }, () =>
            Array.from({ length: GRID_COLS }, () => Math.floor(Math.random() * 10))
        );
        setNumbers(initialGrid);
    }, []);

    // Utility: Extract numeric keys from the given DOM elements.
    const extractIds = (els: Element[]): number[] =>
        els
            .map((el) => el.getAttribute("data-key"))
            .filter(Boolean)
            .map(Number);

    // Clear selection on start unless ctrl/meta is held
    const onStart = ({ event, selection }: SelectionEvent) => {
        if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            setSelected(new Set());
        }
    };

    // Update selection state as items are added/removed from the selection
    const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
        setSelected((prev) => {
            const next = new Set(prev);
            extractIds(added).forEach((id) => next.add(id));
            extractIds(removed).forEach((id) => next.delete(id));
            return next;
        });
    };

    const generateRandomStyles = () => ({
        '--wiggle-range-x': `${Math.random() * 8 - 4}px`, // Random range between -4px and 4px
        '--wiggle-range-y': `${Math.random() * 8 - 4}px`, // Random range between -4px and 4px
        '--wiggle-duration': `${Math.random() * 2 + 0.5}s`, // Random duration from 0.5s to 2.5s
    });


    return (
        <SelectionArea
            className="p-4 grid gap-2 w-full h-full select-none"
            onStart={onStart}
            onMove={onMove}
            selectables=".selectable"
            style={{
                gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            }}
        >
            {numbers.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-between items-center"
                >
                    {row.map((num, colIndex) => {
                        // Generate a unique numeric key for each cell.
                        const key = rowIndex * GRID_COLS + colIndex;
                        const isSelected = selected.has(key);
                        return (
                            <div
                                style={generateRandomStyles()}
                                className="wiggle-container "
                            >
                                 <span
                                     key={colIndex}
                                     data-key={key}

                                     className={`selectable inline-flex items-center justify-center m-1 w-8 h-8 text-xs transition ${
                                         isSelected ? "border border-green-400" : ""
                                     }`}
                                 >
                                {num}
                            </span>
                            </div>

                        );
                    })}
                </div>
            ))}
        </SelectionArea>
    );
};

export default NumberGrid;
