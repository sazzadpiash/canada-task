import React from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
const style = {
    cursor: "move",
};
const Card = ({ singleVideo, moveCard, id, index }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            data-handler-id={handlerId}
            className="flex items-center gap-5 border border-[#6b6b6b] rounded-lg p-5 px-5 my-5"
        >
            <span className="w-[50px]">{singleVideo.id}</span>
            <div className="w-2/5 flex items-center gap-5">
                <img
                    className="w-[100px] h-[70px] rounded"
                    src={singleVideo.photo}
                    alt={singleVideo.title}
                />
                <span>{singleVideo.title}</span>
            </div>
            <span className="grow">{singleVideo.username}</span>
            <span>{singleVideo.like}</span>
        </div>
    );
};

export default Card;
