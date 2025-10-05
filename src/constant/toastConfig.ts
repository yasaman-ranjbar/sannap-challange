export const toastConfig = {
  success: {
    style: {
      fontFamily: "IRANSans",
      direction: "rtl" as const,
      backgroundColor: "#85CFAD",
      color: "#505050",
      borderRadius: "8px",
      height: "60px",
      border: "1px solid #85CFAD",
    },
    iconTheme: {
      primary: "#505050",
      secondary: "#85CFAD",
    },
  },
  error: {
    style: {
      fontFamily: "IRANSans",
      direction: "rtl" as const,
      backgroundColor: "#F8DEE1",
      borderRadius: "8px",
      border: "1px solid #E14856",
      height: "60px",
      color: "#505050",
    },
    iconTheme: {
      primary: "#E14856",
      secondary: "#F8DEE1",
    },
  },
  warning: {
    style: {
      fontFamily: "IRANSans",
      direction: "rtl" as const,
      backgroundColor: "#FEF7EA",
      borderRadius: "8px",
      border: "1px solid #FC9C2E",
      height: "60px",
      color: "#505050",
    },
    iconTheme: {
      primary: "#FC9C2E",
      secondary: "#FEF7EA",
    },
  },
};
