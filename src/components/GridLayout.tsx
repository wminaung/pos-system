"use client";
import React from "react";
import { SxProps, Theme, styled } from "@mui/material/styles";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid, { GridProps } from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import useAppSlice from "@/store/hook/useAppSlice";
import { FormAction } from "@/utils/enums";

export interface ItemProps extends PaperProps {
  itemsProps?: Object;
}
const Item = styled(Paper)<ItemProps>(({ theme }) => ({
  ...theme.typography.body2,

  padding: theme.spacing(1),
  textAlign: "center",
  //   backgroundColor: "wheat",
  color: theme.palette.text.secondary,
}));

export interface GridItemType {
  node: React.ReactNode;
  id: number;
}

interface GridLayoutType {
  gridItems: GridItemType[];
  gridProps?: GridProps;
  itemsProps?: PaperProps;
  containerSx?: SxProps<Theme>;
  containerProps?: GridProps;
  itemSx?: SxProps<Theme>;
}

const GridLayout = ({
  gridItems,
  containerSx = {},
  itemSx = {},
  gridProps = {},
  itemsProps = {},
  containerProps = {},
}: GridLayoutType) => {
  const { actions, dispatch } = useAppSlice();
  return (
    <>
      <Grid container spacing={2} {...containerProps} sx={{ ...containerSx }}>
        {gridItems.map((gridItem) => (
          <Grid key={gridItem.id} item {...gridProps}>
            <Item elevation={0} sx={itemSx} {...itemsProps}>
              {gridItem.node}
            </Item>
          </Grid>
        ))}

        {
          // test
        }
        <Grid item {...gridProps} sx={{}}>
          <Item
            sx={{
              ...itemSx,
              height: "100%",
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            {...itemsProps}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(actions.app.setFormAction(FormAction.create));
                }}
                size="large"
                variant="contained"
              >
                Click to CREATE
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default GridLayout;
