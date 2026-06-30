"use client"

import * as React from "react"
import {


  MoreVerticalIcon,


} from "lucide-react"

import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,


  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function ButtonG() {
 // const [label, setLabel] = React.useState("personal")

  return (

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Edit Profile
              </DropdownMenuItem>
              </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}
