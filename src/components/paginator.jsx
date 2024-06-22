import React, { useEffect } from "react";
import {
  Text,
  Stack,
  ChakraProvider,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@paradox37/ajna-pagination";

const Paginator = ({ recordCount, setLimit, setOffset ,setCurPage }) => {
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
  } = usePagination({
    total: recordCount,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 15,
      isDisabled: false,
      currentPage: 1,
    },
  });

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.200");


  useEffect(() => {
    setLimit(pageSize);
    setOffset(offset);
    setCurPage(currentPage);
  }, [currentPage, pageSize, offset,setCurPage, setLimit, setOffset]);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  return (
    <ChakraProvider>
      <Stack>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={handlePageChange}
        >
          <PaginationContainer
            align="center"
            justify="space-between"
            p={4}
            w="full"
          >
            <PaginationPrevious
              _hover={{
                bg: "gray.400",
                color: "white",
              }}
              bg={bg}
              color={color}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Text>Previous</Text>
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={
                <PaginationSeparator
                  bg={bg}
                  color={color}
                  borderWidth="1px"
                  borderRadius="lg"
                  fontSize="sm"
                  w={7}
                  jumpSize={11}
                />
              }
            >
              {pages.map((page) => (
                <PaginationPage
                  w={7}
                  key={`pagination_page_${page}`}
                  page={page}
                  fontSize="sm"
                  bg={bg}
                  color={color}
                  borderWidth="1px"
                  borderRadius="lg"
                  padding={4}
                  _hover={{
                    bg: "gray.400",
                    color: "white",
                  }}
                  _current={{
                    bg: "gray.600",
                    fontSize: "sm",
                    color: "white",
                    w: 7,
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              _hover={{
                bg: "gray.400",
                color: "white",
              }}
              bg={bg}
              color={color}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Text>Next</Text>
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Stack>
    </ChakraProvider>
  );
};
export default Paginator;
