import React, {useState, useEffect, useMemo, useRef} from "react";
import { SelectionArea, SelectionEvent } from "@viselect/react";

const GRID_ROWS = 10;
const GRID_COLS = 20;

// Predefined wiggle classes
const WIGGLE_CLASSES = ["wiggle-1", "wiggle-2", "wiggle-3", "wiggle-4"];


const NumberGrid: React.FC = () => {
    const [numbers, setNumbers] = useState<number[][]>([]);
    const [selected, setSelected] = useState<Set<number>>(() => new Set());
    const [hoveredCell, setHoveredCell] = useState<number | null>(null); // Track the hovered cell


    // Generate the random classes for all elements only ONCE using useMemo
    // The array is initialized ONCE when the component is mounted.
    const randomClasses = useMemo(() => {
        const classes: Record<number, string> = {};
        for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
            classes[i] = WIGGLE_CLASSES[Math.floor(Math.random() * WIGGLE_CLASSES.length)];
        }
        return classes;
    }, []);


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
        event?.preventDefault();
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

    // For hover effect
    const getNeighboringKeys = (key: number): number[] => {
        const top = key - GRID_COLS >= 0 ? key - GRID_COLS : null;
        const bottom = key + GRID_COLS < GRID_ROWS * GRID_COLS ? key + GRID_COLS : null;
        const left = key % GRID_COLS !== 0 ? key - 1 : null;
        const right = key % GRID_COLS !== GRID_COLS - 1 ? key + 1 : null;

        return [top, bottom, left, right].filter((neighbor) => neighbor !== null) as number[];
    };

    // For numbers replacement
    // const onStop = () => {
    //     // Replace numbers for selected cells
    //     setNumbers((prevNumbers) => {
    //         const flatGrid = prevNumbers.flat();
    //
    //         // Replace numbers only for the selected cells
    //         const updatedFlatGrid = flatGrid.map((num, index) => {
    //             console.log("selected", selected)
    //             if (selected.has(index)) {
    //                 console.log("test")
    //                 // Replace with a new random number
    //                 return Math.floor(Math.random() * 10);
    //             }
    //             return num; // Keep old value
    //         });
    //
    //         // Convert back to 2D
    //         const newGrid = [];
    //         for (let i = 0; i < updatedFlatGrid.length; i += GRID_COLS) {
    //             newGrid.push(updatedFlatGrid.slice(i, i + GRID_COLS));
    //         }
    //
    //         // Reset selection after replacing numbers
    //         setSelected(new Set());
    //         return newGrid;
    //     });
    // };

    return (
        <SelectionArea
            className="p-4 grid gap-2 w-full h-full select-none"
            onStart={onStart}
            onMove={onMove}
            // onStop={onStop}
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
                        const isHovered = key === hoveredCell;
                        const isNeighbor = hoveredCell !== null && getNeighboringKeys(hoveredCell).includes(key);

                        return (
                                 <span
                                     key={colIndex}
                                     data-key={key}
                                     className={`
                                        selectable inline-flex items-center justify-center m-1 w-8 h-8 text-xl cursor-default transition-transform duration-500
                                        ${randomClasses[key]}
                                        ${isHovered ? "scale-170" : ""}
                                        ${isNeighbor ? "scale-150" : ""} 
                                        ${isSelected ? "scale-200" : ""}
                                     `}
                                     onMouseEnter={() => setHoveredCell(key)}
                                     onMouseLeave={() => setHoveredCell(null)}
                                 >
                                {num}
                            </span>
                        );
                    })}
                </div>
            ))}
        </SelectionArea>
    );
};

export default NumberGrid;
