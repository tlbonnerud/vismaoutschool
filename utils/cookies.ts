export function getCookie(name: string): string | undefined {
   // Check if we're in the browser
   if (typeof window === 'undefined') {
      return undefined;
   }

   const cookies = document.cookie.split('; ').reduce((acc, curr) => {
      const [key, ...v] = curr.split('=');
      acc[key] = v.join('=');
      return acc;
   }, {} as { [key: string]: string });

   return cookies[name];
}
