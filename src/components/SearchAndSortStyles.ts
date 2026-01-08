export const desktopStyles = {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      margin: "20px 5px 0px 5px",
      padding: "1.5rem 1rem",
    },
    searchField: {
      backgroundColor: (theme: any) => theme.palette.grey[200],
      flex: 1,
      height: "40px",
      border: "none",
      borderRadius: "10px",
      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
      "& .MuiOutlinedInput-root": {
        border: "none",
        borderRadius: "10px",
        height: "40px",
      },
    },
    iconAdornment: {
      alignItems: "center",
      height: "100%",
    },
    iconButtonBase: {
      backgroundColor: "white",
    },
  };
  
  export const mobileStyles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 2,
      py: 1.5,
      gap: 1,
    },
    rightRow: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    iconSquareButton: {
      backgroundColor: "white",
      minWidth: 40,
      width: 40,
      height: 40,
      p: 0,
    },
    expandedSearchRow: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      flex: 1,
      ml: 1,
    },
    expandedSearchField: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        borderRadius: "16px",
        height: 40,
        px: 1,
      },
      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      "& .MuiOutlinedInput-input": { py: 0 },
    },
    adornment: {
      height: "100%",
      alignItems: "center",
    },
  };
  