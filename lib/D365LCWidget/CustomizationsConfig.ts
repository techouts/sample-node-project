const D365LCWCustomizationConfig = JSON.stringify({
  styleProps: {
    generalStyles: {
      width: "400px",
      height: "550px",
      borderRadius: "10px 10px 10px 10px", // To set the border radius of chatbot widget
    },
  },
  headerProps: {
    styleProps: {
      generalStyleProps: {
        //Overall styles of the Header component, including the container
        borderRadius: "10px 10px 0 0",
      },
    },
  },
  chatButtonProps: {
    controlProps: {
      hideChatTextContainer: true, //To hide the text container (containing title and subtitle) on the chat button
    },
    styleProps: {
      generalStyleProps: {
        //Overall styles of the ChatButton component, including the container
        minWidth: "60px",
        outline: "black",
        boxShadow: "none",
        // height: "100px",
        backgroundColor: "transparent",
        borderColor: "transparent",
        border: "none",
        right: 0,
        bottom: "3px",
        position: "fixed",
        justifyContent: "flex-end",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:focus": {
          outline: "black",
        },
        "@media only screen and (max-width: 600px)": {
          // bottom: "0px",
          height: "100px",
        },
      },
    },
  },
  webChatContainerProps: {
    adaptiveCardStyles: {
      //Sets certain style options of adaptive cards rendered inside WebChat.
      background: "black",
      color: "white",
      anchorColor: "black",
    },
    webChatStyles: {
      //The set of styles exposed by the WebChat component
      avatarSize: 0,
      suggestedActionBackgroundColor: "black",
      suggestedActionBorderColor: "black",
      suggestedActionTextColor: "white",
      suggestedActionLayout: "stacked", // "stacked","flow"
    },
    renderingMiddlewareProps: {
      disableAvatarMiddleware: true, //Whether to disable the use of AvatarMiddleware
      // avatarStyleProps: { //Styles for the agent side avatar
      //     backgroundImage: "url('https://cdn.yellowmessenger.com/rFMPH3tvScFe1646290211436.png')",
      //     backgroundSize: "cover"
      // },
      avatarTextStyleProps: {
        display: "none", //Styles for the agent side initials
      },
      // userMessageStyleProps: { //Styles for the user messages
      //     fontSize: "20px"
      // },
      // systemMessageStyleProps: { //Styles for the system messages
      //     fontSize: "20px"
      // }
    },
  },
  loadingPaneProps: {
    controlProps: {
      //Properties that control the element behaviors
      titleText: "Hello there!",
      subtitleText: "Please wait",
      hideSpinnerText: true,
      spinnerSize: 3,
    },
  },
  footerProps: {
    controlProps: {
      hideEmailTranscriptButton: false, //To hide the email transcript button on the footer
      hideAudioNotificationButton: true, //To hide the audio notification button on the footer
      rightGroup: {
        //Additional custom components to be added on the right side of the footer (left of the default sub-components)
        children: [
          //<Copyright />
          // Since this is a static element, alternatively we can use the string format:
          '{"$$typeof":"$$Symbol:react.element","type":"div","key":"1","ref":null,"props":{"style":{"fontSize":"12px","fontFamily":"Arial","padding":"2px"},"children":"© Shoppers Stop 2024"},"_owner":null,"_store":{}}',
        ],
      },
    },
  },
});

export default D365LCWCustomizationConfig;
