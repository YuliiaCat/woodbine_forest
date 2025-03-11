import IEvent from './event';

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
  events?: IEvent[];
  isFavorite?: boolean;
}

export default ITree;
