import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, boxesIntersect, useSelectionContainer } from "@air/react-drag-to-select";

const GRID_ROWS = 8;
const GRID_COLS = 18;

const WIGGLE_CLASSES = ["wiggle-1", "wiggle-2", "wiggle-3", "wiggle-4"];

const NumberGrid: React.FC = () => {
    const [numbers, setNumbers] = useState<number[][]>([]);
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [hoveredCell, setHoveredCell] = useState<number | null>(null);
    const [_, setSelectionBox] = useState<Box>();

    const elementsContainerRef = useRef<HTMLDivElement | null>(null);
    const selectableItems = useRef<Box[]>([]);

    // Assign random wiggle classes to cells once on mount
    const randomClasses = useMemo(() => {
        const classes: Record<number, string> = {};
        for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
            classes[i] = WIGGLE_CLASSES[Math.floor(Math.random() * WIGGLE_CLASSES.length)];
        }
        return classes;
    }, []);

    useEffect(() => {
        // Generate the initial grid with random numbers
        const initialNumbers = Array.from({ length: GRID_ROWS }, () =>
            Array.from({ length: GRID_COLS }, () => Math.floor(Math.random() * 10))
        );
        setNumbers(initialNumbers);
    }, []);

    const updateSelectableItems = () => {
        if (elementsContainerRef.current) {
            const cellElements = elementsContainerRef.current.querySelectorAll('.selectable');
            selectableItems.current = Array.from(cellElements).map((item) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                return { left, top, width, height };
            });
        }
    };

    useEffect(() => {
        // Update items on initial render and whenever numbers change
        updateSelectableItems();

        // Add resize listener to recalculate bounding boxes on window resize
        const handleResize = () => updateSelectableItems();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [numbers]);

    const { DragSelection } = useSelectionContainer({
        eventsElement: elementsContainerRef.current,
        onSelectionChange: (box: Box) => {
            const scrollAwareBox: Box = {
                ...box,
                top: box.top + window.scrollY,
                left: box.left + window.scrollX,
            };
            setSelectionBox(scrollAwareBox);

            // Detect which items are selected based on the selection box
            const indicesToSelect: number[] = [];
            selectableItems.current.forEach((item, index) => {
                if (boxesIntersect(scrollAwareBox, item)) {
                    indicesToSelect.push(index);
                }
            });
            setSelected(new Set(indicesToSelect));
        },
        onSelectionStart: () => {
            setSelected(new Set());
        },
        onSelectionEnd: () => {
            setTimeout(() => {
                setSelected(new Set())
            },2000)
        },
        selectionProps: {
            style: {
                border: "2px dashed purple",
                borderRadius: 4,
                backgroundColor: "lightblue",
                opacity: 0.3,
            },
        },
        isEnabled: true,
    });

    const getNeighboringKeys = (key: number): number[] => {
        const top = key - GRID_COLS >= 0 ? key - GRID_COLS : null;
        const bottom = key + GRID_COLS < GRID_ROWS * GRID_COLS ? key + GRID_COLS : null;
        const left = key % GRID_COLS !== 0 ? key - 1 : null;
        const right = key % GRID_COLS !== GRID_COLS - 1 ? key + 1 : null;
        return [top, bottom, left, right].filter((neighbor) => neighbor !== null) as number[];
    };

    return (
        <>
            <DragSelection />
            <div
                id="elements-container"
                ref={elementsContainerRef}
                className="p-4 grid gap-1 w-full select-none"
                style={{
                    gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                    gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                }}
            >
                {numbers.flat().map((num, index) => {
                    const isSelected = selected.has(index);
                    const isHovered = hoveredCell === index;
                    const isNeighbor =
                        hoveredCell !== null && getNeighboringKeys(hoveredCell).includes(index);

                    return (
                        <span
                            key={index}
                            data-key={index}
                            className={`
                                selectable inline-flex items-center justify-center w-8 h-8 text-xl font-bold cursor-default
                                transition-transform duration-300
                                ${randomClasses[index]}
                                ${isHovered ? "scale-170" : ""}
                                ${isNeighbor ? "scale-150" : ""}
                                ${isSelected ? "scale-200" : ""}
                            `}
                            onMouseEnter={() => setHoveredCell(index)}
                            onMouseLeave={() => setHoveredCell(null)}
                        >
                            {num}
                        </span>
                    );
                })}
            </div>
        </>
    );
};

export default NumberGrid;