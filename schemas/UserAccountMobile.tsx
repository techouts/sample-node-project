export default interface UserAccountInterface {
  __component?: string;
  id?: number;
  title?: string;
  manageProfileTitle?: string;
  nonLoggedInTitle: string;
  ctaText: string;
  quickActions?: Links[];
  profileItems?: ProfileItems[];
  bottomLinks?: Links[];
  items?: {
    icon: string;
    text: string;
  }[];
  accessToken: any;
  setAccessToken?: Function;
}

export interface ProfileItems {
  id: number;
  title: string;
  subTitle: string;
  path: string;
  loggedIn: boolean | null;
}

export interface Links {
  id: number;
  title: string;
  titlePath: string;
}
