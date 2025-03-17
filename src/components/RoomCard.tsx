import { Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
interface RoomCardProps {
  id: string
  name: string
  totalMembers: number
  userRole: 'OWNER' | 'EDITOR' | 'VIEWER'
  onManage: () => void
}

export function RoomCard({ id, name, totalMembers, userRole, onManage }: RoomCardProps) {

  const role = userRole;
  const members = totalMembers;
  return (
    <Card className="group  hover:shadow-lg overflow-hidden hover:border-primary/50 transition-all duration-300 bg-black/20 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-normal text-primary">{role}</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {members} members
        </CardDescription>
      </CardHeader>

      <CardFooter className="gap-2">
        <Link href={`/room/${id}`}>
          <Button variant="default" size="sm" className="gap-1">
            <Zap size={14} />
            Join
          </Button>
        </Link>
        <Button variant="outline"  size={"sm"}>
          Leave
        </Button>
        {role === "OWNER" && (
          <Button onClick={onManage} variant={"outline"}  size={"sm"}>
            Manage
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

