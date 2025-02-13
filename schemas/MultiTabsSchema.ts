type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export default interface TrunkShowInterface {
    __component: string;
    id: number;
    bgColor: RGB | RGBA | HEX | string;
    bgPadding: string;
    tabs: [
        {
            title: string;
            items: [
                {
                    title: string;
                    subtitle: string;
                    note:[]
                }
            ]
        }
    ]
}