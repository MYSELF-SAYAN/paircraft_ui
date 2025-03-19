"use client";
import { useAuthContext } from '@/context';
import { use, useEffect, useState } from "react"
import { Plus, Search, SlidersHorizontal } from "lucide-react"
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { CreateRoomDialog } from '@/components/CreateRoomDialogue';
import { ManageRoomDialog } from '@/components/ManageRoomDialogue';
import { RoomCard } from '@/components/RoomCard';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { House } from 'lucide-react';




// Default values shown

const page = () => {
  const { token, isAuthenticated, userId } = useAuthContext()

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  const [createOpen, setCreateOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [filter, setFilter] = useState<string>("all")
  interface Room {
    id: string;
    creator_id: string;
    name: string;
    created_at: string;
    updated_at: string;
    totalMembers: number;
    userRole: 'OWNER' | 'EDITOR' | 'VIEWER';
  }


  const createRoom = async (roomName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/rooms/create`, {
          name: roomName
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then((response) => {
          const newRoom: Room = {
            id: response.data.room.id,
            creator_id: response.data.room.creator_id,
            name: roomName,
            created_at: response.data.room.created_at,
            updated_at: response.data.room.updated_at,
            totalMembers: 1,
            userRole: "OWNER"
          }
          setRooms((prevRooms) => [...prevRooms, newRoom]);
          resolve(response.data);
          window.location.reload();
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
  const onRoomDelete = (roomId: string) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    toast("Room deleted successfully", {
      description: `Id: ${roomId}`,

      style: {
        background: "green",
        color: "white",
        border: "1px solid green"
      },
      position: "top-right"

    })
  }
  const filterBasedOnSearch = (e: string) => {
    const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(e.toLowerCase()));
    console.log(filteredRooms)
    setFilteredRooms(filteredRooms);
  }
  const filterBasedOnRole = (e: string) => {
    console.log(e)
    if (e === "all") {
      setFilteredRooms(rooms)
    } else {
      const filteredRoom = filteredRooms.filter((room) => room.userRole.toLowerCase() === e);
      console.log(filteredRoom)
      setFilteredRooms(filteredRoom);
    }
    setFilter(e)
  }
  const leaveRoom = (roomId: string) => {

    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/rooms/leave/${roomId}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        toast("Room left successfully", {
          description: `Id: ${roomId}`,

          style: {
            background: "green",
            color: "white",
            border: "1px solid green"
          },
          position: "top-right"

        })
        window.location.reload();
        resolve(res)
      }).catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message)
          console.log(err)
          reject(err)
        }
      })
    })
  }
  useEffect(() => {

    const fetchRooms = () => {
      axios
        .get(`${BASE_URL}/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setRooms(response.data)
          setFilteredRooms(response.data)
          setDataLoaded(true)
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        })

    }

    fetchRooms();
  }, [token, userId])
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/">


              <House className="mr-2 cursor-pointer h-6 w-6 " />

            </Link>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input placeholder="Search rooms..." className="pl-9 " onChange={(e) => { filterBasedOnSearch((e.target as HTMLInputElement).value) }} />
            </div>
            <Select value={filter} onValueChange={(e) => { filterBasedOnRole(e) }}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="member">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Room
          </Button>
        </div>
        {
          dataLoaded ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRooms.map((room, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <RoomCard
                  key={room?.id}
                  {...room}
                  onLeave={() => leaveRoom(room.id)}
                  onManage={() => {
                    setSelectedRoom(room.id)
                    setManageOpen(true)

                  }}
                />
              </motion.div>
            ))}
          </div> :

            <div className='flex items-center justify-center h-full flex-col'>

              <div className="w-20 h-20 border-8 border-dashed rounded-full animate-spin border-[#7A00E6] "></div>
              <p className='text-2xl font-extrabold'>Loading</p>
            </div>
        }

      </div>

      <CreateRoomDialog open={createOpen} onOpenChange={setCreateOpen} createRoom={createRoom} />
      <ManageRoomDialog open={manageOpen} onOpenChange={setManageOpen} roomId={selectedRoom} onRoomDelete={onRoomDelete} />
    </div>
  )
}

export default page;
