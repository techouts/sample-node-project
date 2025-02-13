type LIST_ITEM = {
    backgroundImage: string;
    contentType: string;
    ctaText: string;
    ctaType: string;
    ctaUrl: string;
}
type CONTENT_SECTION = {
    title: string;
    description: string;
    playButton: string;
    listItems: LIST_ITEM[];
    ctaText: string;
    ctaType: string;
    ctaUrl: string;
}

export default interface BeautyAdviceSchema{
    title: string;
    mainImage: string;
    mainDescrpition: string;
    contentSection: CONTENT_SECTION
}