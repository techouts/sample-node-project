import { toast } from "./Toast";

export default function handleErrorResponse(response: any) {
     if (!response) {
        toast.error("Something went wrong, Please try again!");
      return true;
    } 
     else {
      return false;
    }
  }