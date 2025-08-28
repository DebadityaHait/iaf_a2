export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  state: string;
  period: string;
  artStyle: string;
  category: 'temple' | 'cave' | 'palace' | 'fort' | 'sculpture' | 'painting';
  description: string;
  historicalContext: string;
  keyArtworks: string[];
  notableArtists: string[];
  imageUrl: string;
  established: string;
}