import React, { useState } from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Pagination
      sx={{
        background: "#dbe9fa",
        "& .MuiPaginationItem-page": {
          color: "blue",
        },
        "& .MuiSvgIcon-root": {
          fill: "red",
        },
      }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      variant="outlined"
      shape="rounded"
    />
  );
};

export default PaginationComponent;
