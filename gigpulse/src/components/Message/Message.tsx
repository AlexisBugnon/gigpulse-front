import { useAppSelector } from "../../hooks/redux";

function Message() {
// récupération de message du state pour afficher que le gig a bien été supprimé
const message = useAppSelector(state => state.gig.message);

    return (
        <div className="bg-primary border-t border-b border-secondary text-white px-4 py-3" role="alert">
            <p className="text-sm">{message}</p>
        </div>
    )
}

export default Message;