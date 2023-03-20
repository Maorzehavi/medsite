import { Notyf } from "notyf";

class NotificationService {
  private notify = new Notyf({
    duration: 2000,
    position: { x: "center", y: "top" },
    dismissible: true,
  });

  public success(message: string) {
    this.notify.success(message);
  }

  public error(error: any) {
    this.notify.error(this.extractError(error));
  }

  private extractError(error: any) {
    if (typeof error === "string") return error;

    if (typeof error.response?.data === "string") return error.response.data;

    if (Array.isArray(error.response?.data))
      return error.response.data.join(" ");

    if (typeof error.message === "string") return error.message;

    console.log(error);

    return "An unknown error occurred!";
  }
}

const notificationService = new NotificationService();

export default notificationService;
