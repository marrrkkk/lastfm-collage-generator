export interface LastFMImage {
  '#text': string
  size: string
}

export interface LastFMArtist {
  name: string
  url: string
}

export interface LastFMAlbum {
  name: string
  artist: LastFMArtist
  image: LastFMImage[]
  playcount: string
  url: string
}

export interface CollageData {
  name: string
  artist: LastFMArtist
  image: LastFMImage[]
  playcount: string
}

export interface LastFMResponse {
  topalbums: {
    album: {
      name: string;
      artist: LastFMArtist;
      image: LastFMImage[];
      playcount: string;
    }[];
  };
  error?: number;
} 