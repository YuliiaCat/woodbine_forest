interface ITree {
  id: number;
  image?: string | null;
  title?: string;
  source?: any;
  category?: string;
  description?: string;
  date?: Date | null;
  location?: {
    latitude: number | null,
    longitude: number | null,
    address: string,
  };
  locationName?: string;
  event?: {
    eventId: number;
    description: string;
    date: Date | null;
  }[];
  isFavorite?: boolean;
}

export default ITree;
