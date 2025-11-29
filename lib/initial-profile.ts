import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser()

    if(!user) {
        return redirect("/sign-in")
    }

    const profile = await prisma.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    if(profile) {
        return profile
    }

    const newProfile = await prisma.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl
        }
    })

    return newProfile
}