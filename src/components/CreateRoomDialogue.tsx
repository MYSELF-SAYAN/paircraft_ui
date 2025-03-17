"use client"
import { useState } from "react"
import { Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  createRoom: (roomName: string) => Promise<void>
}

export function CreateRoomDialog({ open, onOpenChange, createRoom }: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("")
  const [loading, setLoading] = useState(false)
  const roomLink = "https://pair.code/room/unique-room-id"

  const copyLink = () => {
    navigator.clipboard.writeText(roomLink)
  }

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    setLoading(true)
    try {
      await createRoom(roomName)
      onOpenChange(false)
      setRoomName("")
    } catch (error) {
      console.error("Error creating room:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>Create a new room and invite others to join your coding session.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Room Name</Label>
            <Input id="name" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter room name" disabled={loading} />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="link">Room Link</Label>
            <div className="flex gap-2">
              <Input id="link" value={roomLink} readOnly className="bg-muted" />
              <Button variant="outline" size="icon" onClick={copyLink} className="shrink-0" disabled={loading}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div> */}
        </div>
        <DialogFooter>
          <Button onClick={handleCreateRoom} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Room"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
