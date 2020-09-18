export interface Post {
    title:string;
    content:string;
    id?:string;
}

export interface Cases {
    Country:string;
    CountryCode:string;
    Active:number ;
    Confirmed: number;
    Recovered:number;
    Deaths:number;
}