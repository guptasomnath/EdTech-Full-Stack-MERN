export interface ICourseOverviewResponse {
    _id: string;
    title: string;
    thumbnail: string;
    duration: string;
    longDescription: string;
    language: string;
    price: number;
    shortDescription: string;
    createdAt: string;
    ratings: number;
    totalRatings: number;
}

export interface IRazorpayCreateOrder {
    razorpayKey: string;
    orderId: string;
    amount: string;
}