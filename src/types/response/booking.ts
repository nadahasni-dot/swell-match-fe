import { BoardType } from "./board";
import { Country } from "./country";

export type Booking = {
  id: number;
  country_id: number;
  board_type_id: number;
  name: string;
  email: string;
  whatsapp: string;
  surfing_experience: number;
  visit_date: string;
  id_card: string;
  created_at: string;
  updated_at: string;
  country: Country;
  board_type: BoardType;
};
