import { amountadded, increment } from "@/features/counter/counterSlice";
import { changeName, defaultName } from "@/features/name/nameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Input, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CounterPage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const name = useAppSelector((state) => state.name.value);
  const [namee, setNamee] = useState(name);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(increment());
    console.log("innerr", count);
  };

  useEffect(() => {
    console.warn("*****************888");
  });

  return (
    <Box>
      <Typography variant="h1">counter : {count}</Typography>
      <Box>
        <Button onClick={handleClick}>increment</Button>
      </Box>
      <Box>
        <Button onClick={() => dispatch(amountadded(8))}>amountadded</Button>
      </Box>
      <Box component={Paper}>
        <Typography variant="h1">name : {name}</Typography>
        <Box>
          <Button onClick={() => dispatch(defaultName())} variant="contained">
            default name
          </Button>
        </Box>
        <Input
          type="text"
          value={namee}
          onChange={(e) => setNamee(e.target.value)}
        />
        <Box>
          <Button
            onClick={() => dispatch(changeName(namee))}
            variant="contained"
          >
            change name
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CounterPage;
