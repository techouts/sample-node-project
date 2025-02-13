export interface HeaderNavigationInterface {
  data: {
    items: NavData[];
  };
}
export interface NavData {
  id: number;
  text?: string;
  isNewTab?: boolean;
  webUrl: URL | null;
  mobileText?: string;
  mobileIconUrl?: URL | string;
  backgroundImageUrl?: URL | string;
  bgColor?: string;
  color?: string;
  mobileNavigationPath: string | URL;
  type?: string;
  data?: any;
  callBack?: Function;
}
