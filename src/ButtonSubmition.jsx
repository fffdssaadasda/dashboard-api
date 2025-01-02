import { useFormStatus } from "react-dom"

const ButtonSubmition = ({ value }) => {
    // console.log(pending);
    return (
        <button type="submit" className="submit">{value || "add new project"} </button>
    )
}

export default ButtonSubmition