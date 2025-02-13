export function setCookie(name: string, value: any, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name: string) {
  const cookieIdentifier = name + "=";
  const cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(cookieIdentifier) == 0)
      return c.substring(cookieIdentifier.length, c.length);
  }
  return "";
}

export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

export function deleteAllCookies() {
  let cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1900 00:00:00 GMT";
  }
}
