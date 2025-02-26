import React from "react";

export default function useClientPagination(
  allRecords: number = 1,
  { recordCount = 10 } = {}
) {
  const [pageNumber, setPageNumber] = React.useState(1);

  const totalPages = Math.ceil(allRecords / recordCount);
  // const thisPageRecords = allRecords.slice(
  //   recordCount * (pageNumber - 1),
  //   recordCount * pageNumber
  // );
  const hasNextPage = pageNumber < totalPages;
  const hasPerviousPage = pageNumber > 1;
  const isPageInBound = isInBound(pageNumber);

  if (!isPageInBound && totalPages > 0) {
    setPageNumber(1);
  }

  /**
   * jumps to the requested page
   * @param {number} newPageNumber - the number you want to check
   */
  function setPage(newPageNumber: number) {
    if (!isInBound(newPageNumber)) {
      setPageNumber(1);
      return;
    }
    setPageNumber(newPageNumber);
  }
  /**
   * goes to the next page
   */
  function next() {
    if (hasNextPage) {
      setPageNumber(pageNumber + 1);
    }
  }
  /**
   * goes to the next page
   */
  function previous() {
    if (hasPerviousPage) {
      setPageNumber(pageNumber - 1);
    }
  }
  /**
   * goes to the last page
   */
  function last() {
    setPageNumber(totalPages);
  }
  /**
   * goes to the first page
   */
  function first() {
    setPageNumber(1);
  }
  /**
   * checks if the page number is actually a number and between minimum and
   * maximum page.
   * @param {number} number - the number you want to check
   */
  function isInBound(number: number) {
    return Number.isFinite(number) && number <= totalPages && number >= 1;
  }
  const finalAnswer = {
    allRecords,
    // thisPageRecords,
    totalPages,
    pageNumber,
    isPageInBound,
    hasNextPage,
    hasPerviousPage,
    setPage,
    next,
    previous,
    last,
    first,
  };
  return finalAnswer;
}
