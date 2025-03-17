"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from '@/context/SocketProvider';
import { useAuthContext } from '@/context';

type NotMemberProps = {
  roomId: string;
  setIsmember: React.Dispatch<React.SetStateAction<boolean>>
};

const NotMember = ({ roomId, setIsmember }: NotMemberProps) => {
  const socket = useSocket();
  const { token } = useAuthContext()
  const sendRequest = () => {

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/join/${roomId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {

        socket?.emit("joining_request", { roomId })
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

  }
  useEffect(() => {
    socket?.on("approved_request", () => {
      console.log("Yoo request accepted")
      setIsmember(true)
    })
    return () => {
      socket?.off("approved_request")
    };
  }, [socket])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-lg text-center space-y-6 p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold">Access Restricted</h1>
        <p className="text-gray-400">
          You are not a member of this room. Request access to join and start collaborating in real time. Refresh the page periodically to check for updates.
        </p>
        <button onClick={sendRequest} className="relative px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-0 transition-transform group-hover:scale-100"></span>
          <span className="relative group-hover:text-black transition-colors">Request to Join</span>
        </button>
      </div>
    </div>
  );
}

export default NotMember;


