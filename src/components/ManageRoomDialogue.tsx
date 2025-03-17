"use client"

import { useState, useEffect } from "react"
import { Check, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"
import { useSocket } from "@/context/SocketProvider"

interface ManageRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomId: string | null
  onRoomDelete: (roomId: string) => void
}
type Room = {
  id: string
  creator_id: string
  name: string
  created_at: string
  updated_at: string
  members: Array<{
    id: string
    user_id: string
    room_id: string
    role: "OWNER" | "EDITOR" | "VIEWER"
    joined_at: string
    user: {
      name: string
    }
  }>
  joinRequests: Array<{
    id: string
    user_id: string
    room_id: string
    status: "PENDING" | "ACCEPTED" | "REJECTED"
    created_at: string
    user: {
      name: string
    }
  }>
}
interface UpdatedRole {
  userId: string;
  updateRole: "EDITOR" | "VIEWER";
}
export function ManageRoomDialog({ open, onOpenChange, roomId, onRoomDelete }: ManageRoomDialogProps) {
  const socket = useSocket()
  const token = localStorage.getItem("token")
  const [step, setStep] = useState<"requests" | "members">("requests")
  const [loading, setLoading] = useState(false)
  const [roomData, setRoomData] = useState<Room>()
  const [updatedRole, setUpdatedRole] = useState<UpdatedRole[]>([])
  const acceptRequest = async (requestId: string, userId: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}/requests/${requestId}/approve`,
        {
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setRoomData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          joinRequests: prev.joinRequests.filter((request) => request.id !== requestId)
        }
      })
      const toastId = await toast("Request accepted", {
        description: `Id: ${requestId}`,
        action: {
          label: "Close",
          onClick: () => toast.dismiss(toastId),
        },
        style: {
          background: "green",
          color: "white",
          border: "1px solid green"
        }

      })
      socket?.emit("accepted_request", { roomId, userId })
      onOpenChange(false)
    } catch (error) {
      const toastId = toast("There is some error", {
        description: "Check console for more info",

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
      console.error("Error accepting request:", error)
    }


  }
  const rejectRequest = async (requestId: string) => {
    console.log(requestId, "rejected")

    console.log(requestId, "accepted")
  }
  const removeMember = async (memberId: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/rooms/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // const toastId = await toast(response.data, {
      //   description: `Id: ${memberId}`,
      //   action: {
      //     label: "Close",
      //     onClick: () => toast.dismiss(toastId),
      //   },
      //   style: {
      //     background: "green",
      //     color: "white",
      //     border: "1px solid green"
      //   }

      // })

    } catch (error) {
      const toastId = toast("There is some error", {
        description: "Check console for more info",

        action: {
          label: "Close",
          onClick: () => toast.dismiss(toastId),

        }, style: {
          background: "red",
          color: "white",
          border: "1px solid red"
        }

      })
      console.error("Error accepting request:", error)
    }

  }
  const deleteRoom = async (roomId: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      onRoomDelete(roomId)
      setStep("requests")
      onOpenChange(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setLoading(true)
    if (roomId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {

          setRoomData(response.data)
        })
        .catch((error) => {
          console.error("Error fetching room data:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [roomId])
  const updateMemberRole = (id: string, value: string): void => {
    if (roomData?.members.find((member) => member.id === id)?.role === value) return
    setRoomData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        members: prev.members.map((member) => {
          if (member.id === id) {
            return {
              ...member,
              role: value as "EDITOR" | "VIEWER"
            }
          }
          return member
        })
      }
    })
    setUpdatedRole((prev) => [...prev, { userId: id, updateRole: value as "EDITOR" | "VIEWER" }])
    console.log(updatedRole)
  }
  const updateMember = () => {
    if (!updatedRole) return
    updatedRole.map(async (role) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/members/${role.userId}/promote`, {
          role: role?.updateRole
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then((response) => {
          console.log(response.data)
          setUpdatedRole([])
          onOpenChange(false)
          setStep("requests")
        })
        .catch((error) => {
          console.error("Error updating member:", error)
        })
    })

  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Room</DialogTitle>
          <DialogDescription>Update room details and manage members.</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 py-4">
          <Button
            variant={step === "requests" ? "default" : "outline"}
            onClick={() => setStep("requests")}
            className="flex-1"
          >
            Requests
          </Button>
          <Button
            variant={step === "members" ? "default" : "outline"}
            onClick={() => setStep("members")}
            className="flex-1"
          >
            Members
          </Button>
        </div>

        {loading ? <p>Loading...</p> : step === "requests" ? (

          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              {roomData?.joinRequests.length === 0 ? <p className="w-full h-full flex items-center justify-center">No requests</p> : roomData?.joinRequests.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{member.user.name}</span>
                  <div className="flex space-x-5">
                    <Button variant="outline" size="icon" className="shrink-0" onClick={() => acceptRequest(member.id, member.user_id)}>
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0" onClick={() => rejectRequest(member.id)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              {roomData?.members.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{member.user.name}</span>
                  {
                    member.role !== "OWNER" &&
                    <X className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => removeMember(member.id)} />
                  }
                  {
                    member.role === "OWNER" ? <p className="w-full h-full flex items-center justify-end">Owner</p> :

                      <Select value={member.role} onValueChange={(value) => updateMemberRole(member.id, value)}>
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EDITOR">Editor</SelectItem>
                          <SelectItem value="VIEWER">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "members" && <DialogFooter>
          <Button onClick={() => deleteRoom(roomId || "")}>Delete</Button>
          <Button disabled={!updatedRole} onClick={() => updateMember()}>Save Changes</Button>
        </DialogFooter>}
      </DialogContent>

    </Dialog>
  )
}

