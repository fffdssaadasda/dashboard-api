import { useForm } from "react-hook-form";
import ButtonSubmition from "./ButtonSubmition";

export default function HookForm() {
    const { register, formState, handleSubmit, getValues } = useForm({
        mode: "onChange"
    });
    const { errors } = formState;
    const handelSub = (data) => {
        console.log(data, errors);
    }
    return (
        <form onSubmit={handleSubmit(handelSub)} >
            <div>
                <label htmlFor="">username</label>
                <input type="text" {...register("username", {
                    required: {
                        value: true,
                        message: "username is required"
                    },
                    min: {
                        value: 6,
                        message: "please provide 6 or more characters"
                    }
                })} />
            </div>
            {errors?.username && <span className="error">{errors.username.message}</span>}
            <div>
                <label htmlFor="">password</label>
                <input type="password" {...register("password", {
                    required: {
                        value: true,
                        message: "password is required"
                    },
                    minLength: {
                        value: 6,
                        message: "password must be 6 or more characters"
                    },
                    maxLength: {
                        value: 12,
                        message: "password must be 12 or less"
                    }
                })} />
            </div>
            {errors?.password && <span className="error">{errors.password.message}</span>}
            <div>
                <label htmlFor="">confirm password</label>
                <input type="password" {...register("confirm_password", {
                    required: true,
                    validate: (val) => getValues().password !== val && "no matches password"
                })} />
            </div>
            {errors?.confirm_password && <span className="error">{errors.confirm_password.message}</span>}
            <div>
                <label htmlFor="">email</label>
                <input type="email" {...register("email", {
                    required: true,
                })} />
            </div>
            <ButtonSubmition />
            {/* <input type="submit" value={`${isSubmitting ? "submiting..." : isSubmitting ? "submited" : "Submit"}`} /> */}
        </form>
    )
}
