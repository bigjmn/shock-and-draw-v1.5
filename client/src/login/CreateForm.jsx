import SubmitButton from "./components/SubmitButton"
export default function CreateForm() {

    return (
        <form>
            <label>
                <span>Username:</span>
                <input type="text" name="username" />
            </label>
            <SubmitButton />
        </form>
    )
}