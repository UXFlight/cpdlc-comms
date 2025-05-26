import Message from "./Message";

type Props = {  
    message: {
        ref: string
        id: string;
        state: string;
        element: string;
        intent: string;
    };
};

export default function MessageDisplayTab({message}: Props) {
    return (    
        <div> 
         <Message
            message={message}
        />
        </div>
    );
}
