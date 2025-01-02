import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonSubmition from "./ButtonSubmition"
import { useFormStatus } from "react-dom"

const LearnZod = () => {
    // const { pending } = useFormStatus()
    const mySchema = z.object({
        username: z.string({ message: "user name required" }),
        email: z.string({ message: "please enter your name it's required" }).email("please Enter Valid email"),
        password: z.string().max(12, "password should be 12 or less").min(6, "password should be 6 or more"),
        confirm_password: z.string().max(12, "confirm_password should be 12 or less").min(6, "confirm_password should be 6 or more")
    }).refine(obj => obj.password === obj.confirm_password, { message: "please enter password & confirm password same!", path: ["confirm_password"] })
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm({
        mode: "onBlur",
        resolver: zodResolver(mySchema)
    })
    const handelSub = (data) => console.log(data);
    return (
        <form onSubmit={handleSubmit(handelSub)} >
            <div>
                <label htmlFor="">username</label>
                <input type="text" {...register("username", {
                    required: true,
                })} />
            </div>
            {errors?.username && <span className="error">{errors.username.message}</span>}
            <div>
                <label htmlFor="">password</label>
                <input type="password" {...register("password", {
                    required: true
                })} />
            </div>
            {errors?.password && <span className="error">{errors.password.message}</span>}
            <div>
                <label htmlFor="">confirm password</label>
                <input type="password" {...register("confirm_password", {
                    required: true
                })} />
            </div>
            {errors?.confirm_password && <span className="error">{errors.confirm_password.message}</span>}
            <div>
                <label htmlFor="">email</label>
                <input type="email" {...register("email", {
                    required: true
                })} />
            </div>
            {errors?.email && <span className="error">{errors.email.message}</span>}
            <ButtonSubmition />
            {/* <input type="submit" value={`${isSubmitting ? "submiting..." : isSubmitting ? "submited" : "Submit"}`} /> */}
        </form>
    )
}

export default LearnZod