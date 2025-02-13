export default interface MobileSharePopUpInterface 
   {
    data: {
      text : string;
      bottomText : string;
      personalSuggest: [
        {
          mediaIcon: string;
          mediaName: string;
          path: string | URL;
        }
      ],
      socialMedia: [
        {
            mediaIcon: string;
            mediaName: string;
             path: string | URL;
          }
      ],
      tabList : [
        {
            listText : string;
            listIcon : string;
        },
      ],
    }
  }
