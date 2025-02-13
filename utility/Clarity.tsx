import Script from "next/script";

export const isProdEnv = process.env.NODE_ENV === 'production';

export function Clarity() {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;

    if ([!!id, !!isProdEnv].includes(false)) return null;

    return (
        <Script
            
            id="_clarity"
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.defer=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${id}");
            `,
            }}
        />
    );
}
