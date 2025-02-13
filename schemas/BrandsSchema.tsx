export interface MobileTabsInterface {
    title: string;
    items?: MobileTabItems[];
}

export interface MobileTabItems {
    title: string;
    listOfBrands?: BrandDetails[]
}

export interface BrandsInterface {
    title?: string;
    brandsList?: { brandTitle?: string }[]
}

export interface BrandDetails {
    brandImageUrl: string | URL;
    ctaUrl: string | URL;
}
export interface Items {
    title: string;
    listOfBrands?: BrandDetails[]
}