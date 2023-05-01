import React from "react";

const Card = ({ singleVideo }) => {
    return (
        <div className="flex items-center gap-5 border border-[#6b6b6b] rounded-lg p-5 px-5 mb-5">
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
