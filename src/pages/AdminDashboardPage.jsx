import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import update from "immutability-helper";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "../components/Card";
// dnd

const AdminDashboardPage = () => {
    const { state, dispatch } = React.useContext(AuthContext);
    const token = localStorage.getItem("token");
    const options = { day: "numeric", month: "long", year: "numeric" };
    const today = new Date().toLocaleDateString("en-US", options);
    const [time, setTime] = useState(new Date());
    const [video, setVideo] = useState([]);
    const [page, setPage] = useState(1);
    // const [cards, setCards] = useState(video);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setVideo((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
    }, []);

    // useEffect(() => {
    //     setCards(video);
    // }, [video]);

    // useEffect(() => {
    //     setVideo(cards);
    // }, [cards]);

    useEffect(() => {
        setTime(new Date());
        fetch("https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-project":
                    "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                payload: {},
                page: page,
                limit: 10,
            }),
        })
            .then((response) => response.json())
            .then((data) => setVideo(data.list))
            .catch((error) => console.error(error));
    }, [state, page]);

    console.log(video);
    return (
        <>
            <div>
                <div className="w-5/6 mx-auto">
                    <div className="flex items-center justify-between mb-16">
                        <span className="text-6xl">
                            <b>APP</b>
                        </span>
                        <button
                            onClick={() => dispatch({ type: "LOGOUT" })}
                            className="bg-[#9bff00] text-black px-5 py-1 rounded-full"
                        >
                            Logout
                        </button>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-4xl font-light">
                                    Today's Leaderboard
                                </span>
                            </div>
                            <div>
                                <div className="bg-[#1d1d1d] px-3 py-2 rounded  font-light flex items-center">
                                    <span>{today}</span>
                                    <hr
                                        style={{
                                            border: "3px solid",
                                        }}
                                        className="mx-3 rounded-full"
                                    />
                                    <span className="bg-[#9bff00] text-black rounded px-1">
                                        SUBMISSION OPEN
                                    </span>
                                    <hr
                                        style={{
                                            border: "3px solid",
                                        }}
                                        className="mx-3 rounded-full"
                                    />
                                    <span>
                                        {time.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-10 gap-5 mb-5">
                            <span className="w-[50px]">#</span>
                            <span className="w-2/5">Title</span>
                            <span className="grow">Author</span>
                            <span>Most Liked</span>
                        </div>

                        {video.map((singleVideo, index) => (
                            <Card
                                key={singleVideo.id}
                                singleVideo={singleVideo}
                                cardType="card"
                                moveCard={moveCard}
                                id={singleVideo.id}
                                index={index}
                            ></Card>
                        ))}
                        <div className="text-right">
                            <button
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                                className="bg-[#9bff00] text-black px-5 py-1 rounded mr-3"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                                className="bg-[#9bff00] text-black px-5 py-1 rounded"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboardPage;
