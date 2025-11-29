import { initialProfile } from "@/lib/initial-profile"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import InitialModel from "@/components/modals/initial-modal"


const SetupPage = async () => {
    const profile = await initialProfile()

    // search for a server
    const server = await prisma.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        redirect(`/servers/${server.id}`)
    }

    return <InitialModel/>
}

export default SetupPage