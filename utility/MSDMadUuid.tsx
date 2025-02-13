  export function MSDsetCookie(name: any, days: any, path: any) {
    let MADid: any = Array(32).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${MADid}${expires}; path=${path}`;
    return MADid
  }


  
