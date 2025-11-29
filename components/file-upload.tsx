"use client"
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "serverImage" | "messageFile"
    value: string

}

export const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {
    return (

        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={
                (res) => {
                    onChange(res?.[0].url)
                }}
            onUploadError={(error: Error) => {
                console.log("Error: ",error);

            }}

        />
    )
}