import Message from "./Message";

export default function MessageContainer({ messages }) {
    return ( 
        <div className="flex flex-col justify-between gap-4">
            {messages.map((msg) => (
            <Message
                key={msg.id}
                element={msg.element}
            />
            ))}
        </div>

    );
}