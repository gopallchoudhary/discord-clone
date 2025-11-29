import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthorized")

    return { userId: userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            return handleAuth();
        })
        .onUploadComplete(async ({ file, metadata }) => { return { url: file.url } }),

    messageFile: f(['image', 'pdf'])
        .middleware(async () => {
            return handleAuth();
        })
        .onUploadComplete(async ({ file, metadata }) => { return { url: file.url } }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
