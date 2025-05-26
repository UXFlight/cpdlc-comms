import Message from "./Message";

type Props = { 
    messages: { id: string; element: string }[] | null;
};

export default function MessageContainer({ messages }) {
    return ( 
        <div className="flex flex-col justify-between gap-4">
            {messages ? (
                messages.map((msg) => (
                <Message
                    key={msg.id}
                    message={msg}
                />
                ))
            ) : (
                <div className="flex justify-center mt-60 text-white-100">No new messages</div>
            )}

        </div>

    );
}