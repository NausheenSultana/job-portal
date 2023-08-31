const sharedStyles = {
  cardStyle: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  titleStyle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    padding: "10px",
    "@media (min-width: 1000px)": {
      paddingLeft: 0,
    },
  },
  descriptionStyle: {
    fontSize: "16px",
    color: "#555",
  },
  labelStyle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // Align labels to the left
  },
  dataStyle: {
    fontSize: "16px",
    color: "#555",
    textAlign: "left", // Align data to the left
  },
  iconLinkStyle: {
    color: "#888",
    display: "flex",
    alignItems: "center",
  },
  profile: {
    ...commonContainerStyles(),
  },
  listing: {
    ...commonContainerStyles(),
  },
  linkStyle: {
    color: "#1976d2",
    listStyleType: "none",
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
    "&:hover": {
      color: "#197999",
    },
  },
  wrapperStyle: {
    width: "80vw",
    height: "100vh",
    margin: "0 auto",
    paddingTop: "100px",
    "@media (max-width: 900px)": {
      width: "100vw",
    },
  },
  jobPortalStyle: {
    width: "80%",
    height: "80vh",
    margin: "23px auto",
  },
  jobCardStyle: {
    ...commonCardStyles(),
    marginBottom: "0px",
    backgroundColor: "#dbe9fa !important",
    "&:not(:last-child)": {
      marginBottom: "20px",
    },
  },
  profileInnerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "30px",
    // height: "90vh",
    // backgroundColor: "#fff",
    borderRadius: "10px",
    // margin: "0px 20px",
  },
  navStyle: {
    height: "90px",
    width: "100vw",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 5px 5px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    backgroundColor: "dodgerblue",
    display: "flex",
    alignItems: "center",
  },
};

function commonContainerStyles() {
  return {
    // padding: "30px",
    // height: "90vh",
    // backgroundColor: "#fff",

    borderRadius: "10px",
    margin: "0px 20px",
    "@media (max-width: 900px)": {
      padding: 0,
    },
  };
}

// Common styles for cards
function commonCardStyles() {
  return {
    padding: "30px",
    marginBottom: "30px",
  };
}

export default sharedStyles;
