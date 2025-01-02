import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProject, editProject } from "./functions";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import HookForm from "./HookForm";
import AddNewData from "./AddNewData";
import { useFetchQuery } from "./hooks/useFetchQuery";
import { useCreateProject } from "./hooks/useCreateProject";
import { useDeleteProject } from "./hooks/useDeleteProject";
import { API_URL } from "./vars";

const ReactQureyTemplate = () => {
    // const { data: projects, isLoading, fetchStatus, status } = useQuery({
    //     queryKey: ["projects"],
    //     queryFn: async () => {
    //         const res = await fetch("http://localhost:5000/projects")
    //         return res.json()
    //     }
    // });
    // const queryClient = useQueryClient()
    // const { mutate, isError, isSuccess } = useMutation({
    //     mutationFn: deleteProject,
    //     onError: err => console.log(err),
    //     onSuccess: async () => {
    //         console.log("deleted");
    //         await queryClient.invalidateQueries({
    //             queryKey: ["projects"]
    //         })
    //     }
    // });
    const showNotification = () => {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                new Notification("Notification")
            }
        })
        /* 
        toast.promise(new Promise((resolve, reject) => setTimeout(() => {
        resolve("Success")
    }, 2000)), {
        success: "Sucess Promise",
        error: "Error Promise",
        loading: "now loading the promise ..."
    })
        */
    }
    const {
        deleteProject,
        errorDelete,
        isErrorDelete
    } = useDeleteProject(["projects"], (id) => fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
    }))
    const { data, isLoading, isError, error } = useFetchQuery(["projects"], async () => {
        const res = await fetch(`${API_URL}/projects`)
        return res.json()
    });
    console.log(data);
    return (
        <div>
            {/* <HookForm /> */}
            <Toaster position="top-center" />
            <AddNewData />
            {/* {JSON.stringify(data)} */}
            {/* {data?.map(e => {
                return <>
                    <button onClick={(id) => deleteProject(e._id)}>delete</button>
                    <div>{e.title}</div>
                </>
            })} */}
            <div className="form_data center">
                {isLoading && "Please Wait ..."}
                {`${data?.length ? `${data.length} projects found` : ""} `}
            </div>
        </div>
    )
}
export default ReactQureyTemplate