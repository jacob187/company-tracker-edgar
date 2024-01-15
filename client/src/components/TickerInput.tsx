/* eslint-disable react/no-array-index-key */
import TextField from '@mui/material/TextField';

interface TickerInputProps {
  tickers: string[];
  handleTickerChange: (index: number, value: string) => void;
}

function TickerInput({ tickers, handleTickerChange }: TickerInputProps) {
  return (
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
}

export default TickerInput;
