import React, { useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "../components/Card";

const AdminDashboardPage = () => {
    const { state, dispatch } = React.useContext(AuthContext);
    const token = localStorage.getItem("token");
    const options = { day: "numeric", month: "long", year: "numeric" };
    const today = new Date().toLocaleDateString("en-US", options);
    const [time, setTime] = useState(new Date());
    const [video, setVideo] = useState([]);

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
                page: 1,
                limit: 10,
            }),
        })
            .then((response) => response.json())
            .then((data) => setVideo(data.list))
            .catch((error) => console.error(error));
    }, [state]);

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

                        {video.map((singleVideo) => (
                            <Card
                                key={singleVideo.id}
                                singleVideo={singleVideo}
                            ></Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboardPage;
