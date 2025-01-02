import { useMutation, useQuery } from "@tanstack/react-query";
import ButtonSubmition from "./ButtonSubmition";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorValidate from "./ErrorValidate";
import toast from "react-hot-toast";
import { useCreateProject } from "./hooks/useCreateProject";
import { useDeleteProject } from "./hooks/useDeleteProject";
import { API_URL } from "./vars";
const AddNewData = () => {
    const { createProject, data: newProject, isError, error, isPending: isCreating } = useCreateProject(["projects"], (formData) => fetch(`${API_URL}/projects`, {
        method: "POST",
        body: formData
    }))
    const { data } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => (await fetch(`${API_URL}/projects`)).json()
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({

    });
    console.log(errors);
    return (
        <form className="form_data" onSubmit={handleSubmit((data) => {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('projectType', data.projectType);
            formData.append('link', data.link);
            formData.append('technologies', data.technologies);
            console.log(data.projectType);

            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
            createProject(formData, {
                onSuccess: () => reset()
            });
            toast.success("Project Added!",) 
        }, (err) => {
            toast.error("please enter valid data",)
        }
        )} >
            <div className="col">
                <label htmlFor="">title</label>
                <input type="text" {...register('title', {
                    required: {
                        value: true,
                        message: "please enter project name"
                    }
                })} />
            </div>
            {errors.title && <ErrorValidate msg={errors.title.message} />}
            <div className="col">
                <label htmlFor="">technologies</label>
                <input type="text" {...register("technologies", {
                    required: {
                        value: true,
                        message: "please enter project technologies"
                    }
                })} placeholder="next.js, tailwind css, react" />
            </div>
            {errors.technologies && <ErrorValidate msg={errors.technologies.message} />}
            <div className="col">
                <label htmlFor="">Link</label>
                <input type="text"  {...register("link", {
                    required: {
                        value: true,
                        message: "please provide project link"
                    }
                })} placeholder="https://example.com" />
            </div>
            {errors.link && <ErrorValidate msg={errors.link.message} />}
            <div className="col">
                <label htmlFor="">Images</label>
                <input type="file" multiple={true} {...register('images', {
                    onChange: (e) => console.log(e.target.files),
                    required: {
                        value: true,
                        message: "please Enter Project Image/(s)"
                    }
                })} />
            </div>
            {errors.images && <ErrorValidate msg={errors.images.message} />}
            <select {...register("projectType", {
                required: {
                    value: true,
                    message: "please select project type"
                },
            })}>
                <option value="">Select</option>
                <option value="front_end">Front End</option>
                <option value="back_end">Backend </option>
            </select>
            {errors.projectType && <ErrorValidate msg={errors.projectType.message} />}
            <ButtonSubmition value={isCreating && "adding..."} />
            {/* <img src={`http://localhost:5000/images/${data && data[6]?.images[2]}`} alt="" /> */}
            {/* <input type="submit" value={`${isSubmitting ? "submiting..." : isSubmitting ? "submited" : "Submit"}`} /> */}
        </form >
    )
}

export default AddNewData
