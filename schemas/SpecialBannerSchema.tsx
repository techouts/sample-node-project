type CTALIST = {
    ctaText:string;
    ctaType:string;
    ctaUrl:string;
}

export default interface SpecialBannerSchema {
    title: string;
    description: string;
    backgroundImage: string;
    ctaList: CTALIST[]
}