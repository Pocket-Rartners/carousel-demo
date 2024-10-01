export interface Slide {
    url: string;
    transitionType: string;
    transitionInterval: number;
    isCollapsed?: boolean;
}

export interface Carousel {
    id: string;
    name: string;
    slides: Slide[];
}
