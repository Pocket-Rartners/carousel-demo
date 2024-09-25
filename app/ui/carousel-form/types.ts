export interface Slide {
    url: string;
    transitionType: string;
    transitionInterval: number;
    isCollapsed?: boolean;
}

export interface Carrousel {
    id: string;
    name: string;
    slides: Slide[];
}
