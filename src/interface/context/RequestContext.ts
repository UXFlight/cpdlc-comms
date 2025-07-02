import { RequestCategory } from "@/constants/tabs/Request";
import { Request } from "@/interface/Request";

export interface RequestContextType {
  request: Request;
  activeRequest: RequestCategory | null;
  setActiveRequest: (category: RequestCategory | null) => void;
  preview: boolean;
  setPreview: (value: boolean) => void;
  setRequest: (data: Partial<Request>) => void;
  resetRequest: () => void;
}
