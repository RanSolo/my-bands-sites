interface YouTube {
    channel?: string;
    playlist?: string;
    featuredEmbed?: string;
}

interface Facebook {
    events?: string;
    page?: string;
}

interface Bio {
  headline?: string;
  body?: string;
}

interface Media {
    logo?: string;
    background?: string;
    youTube?: YouTube;
    facebook?: Facebook;
}

export interface Band {
    id: number;
    bio?: Bio;
    baseUrl: string;
    name: string;
    description: string;
    media?: Media;
}

export interface GetBand {
    getBand: () => Band
}
