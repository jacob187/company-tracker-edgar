import React from 'react';
import TextField from '@mui/material/TextField';

interface TickerInputProps {
  tickers: string[]
  handleTickerChange: (index: number, value: string) => void
}

const TickerInput: React.FC<TickerInputProps> = ({
  tickers,
  handleTickerChange,
}) => (
  <>
    {tickers.map((ticker, index) => (
      <TextField
        key={index}
        type="text"
        placeholder="Enter company ticker"
        value={ticker}
        onChange={(event) => handleTickerChange(index, event.target.value)}
        fullWidth
        margin="normal"
      />
    ))}
  </>
);

export default TickerInput;
