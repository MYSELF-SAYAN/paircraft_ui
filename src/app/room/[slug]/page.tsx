"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { toast } from "sonner"
import CodeEditor from "@/components/CodeEditor";
import ChatSection from "@/components/ChatSection";
import { useAuthContext } from "@/context";
import NotMember from "@/components/NotMember";
type Props = {
    params: {
        slug: string;
    };
};

const Page = ({ params }: Props) => {
    const socket = useSocket();
    const { userId, username } = useAuthContext()
    const [userRole, setUserRole] = useState<"OWNER" | "EDITOR" | "VIEWER">();
    const [isMember, setMember] = useState(false);
    useEffect(() => {
        if (!socket) {
            const toastId = toast("Request accepted", {
                description: `⚠️ Socket not available yet`,
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(toastId),
                },
                style: {
                    background: "red",
                    color: "white",
                    border: "1px solid red"
                }

            })
            console.log("⚠️ Socket not available yet");
            return;
        }

        console.log("📡 Emitting 'first' event to the server");
        socket.emit("first");

        socket.on("first_response", (data) => {
            console.log("📥 Response received from server:", data);
        });
        socket.emit("join_room", { roomId: params.slug });
        socket.on("join_error", (data) => {
            const toastId = toast(data, {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(toastId),
                },
                style: {
                    background: "red",
                    color: "white",
                    border: "1px solid red"
                },
                position: "top-right"
            })
        })
        socket.on("user_joined", (data) => {
            const toastId = toast(`${data?.membership.user.name} joined the room with role ${data?.membership.role}`, {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(toastId),
                },
                style: {
                    background: "green",
                    color: "white",
                    border: "1px solid green"
                },
                position: "top-right"
            })
            if (data?.membership.user.id === userId) {

                setUserRole(data?.membership.role)
            }
            setMember(true)
        })
        socket.on("joining_request_sent", (data) => {
            if (userRole === "OWNER") {
                const toastId = toast(`New joining request accept/reject`, {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(toastId),
                    },
                    style: {
                        background: "green",
                        color: "white",
                        border: "1px solid green"
                    },
                    position: "top-right"
                }
                )
            }
        })
        socket.on("accepted_request", (data) => {
            setMember(true)
            const toastId = toast(`Joining request accepted`, {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(toastId),
                },
                style: {
                    background: "green",
                    color: "white",
                    border: "1px solid green"
                },
                position: "top-right"
            }
            )
        })
        socket.on("user_left", (data) => {
            const toastId = toast(`A user left the room`, {
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(toastId),
                },
                style: {
                    background: "red",
                    color: "white",
                    border: "1px solid red"
                },
                position: "top-right"
            })
        })
        return () => {
            socket.off("first_response");
            socket.off("user_joined");
            socket.off("join_error");
            socket.off("joining_request_sent");
            socket.off("accepted_request");
            socket.off("user_left");
        };
    }, [socket, userId]);

    return (
        <div>
            {
                isMember ? <div className="flex bg-gray-950 lg:flex-row flex-col">
                    <CodeEditor socket={socket} roomId={params.slug} username={username} role={userRole} />
                    {userId && <ChatSection socket={socket} roomId={params.slug} userId={userId} />}

                </div> : <NotMember roomId={params?.slug} setIsmember={setMember} />
            }

        </div>
    );
};

export default Page;
