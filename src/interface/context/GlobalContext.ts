export interface GlobalContextType {
  connectionState: boolean | null;
  setConnectionState: React.Dispatch<React.SetStateAction<boolean | null>>;
  isConnectionPossible: boolean;
  setIsConnectionPossible: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
