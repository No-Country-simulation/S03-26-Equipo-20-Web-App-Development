export interface Testimony {
    id: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    quote: string;
    videoUrl: string;
    duration: string;
    tags: string[];
    sentiment: number;
    submittedAt: string;
}

export interface Review {
    idTestimonial: string | undefined;
    status: string;
    comment: string;
};