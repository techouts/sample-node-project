import { Box, Button } from "@mui/material";
import { Category } from './BrandDiscount';
export const CategoryButtons = ({
    categories,
    selectedCategory,
    onCategoryClick,
  }: {
    categories: Category[];
    selectedCategory: string;
    onCategoryClick: (category: Category) => void;
  }) => (
    <Box
      display="flex"
      flexDirection="row"
      gap={1}
      sx={{
        overflowX: "scroll",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {categories.map((category: Category, index: number) =>
        category.count > 0 ? (
          <Button
            key={index}
            sx={{
              borderRadius: "50px",
              padding: "2px 16px",
              fontSize: "10px",
              color: selectedCategory === category.label ? "#FF3B7D" : "#231F20",
              border: "1px solid #707070",
              background:"white",
              flex: "0 0 auto",
              whiteSpace: "nowrap",
            }}
            onClick={() => onCategoryClick(category)}
          >
            {category.label}
          </Button>
        ) : null
      )}
    </Box>
  );
  