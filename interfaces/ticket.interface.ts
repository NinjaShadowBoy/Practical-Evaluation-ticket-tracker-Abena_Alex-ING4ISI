export interface TicketType {
  id: number;
  title: string;
  text?: string;
  date: Date;
  status: "created" | "ongoing" | "completed";
  rating?: number;
}
