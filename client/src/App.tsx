import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/lab/Alert';
import Api from './Api';
import TickerInput from './components/TickerInput';
import YearsBackInput from './components/YearsBackInput';
import FinancialDataTable from './components/FinancialDataTable';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
  },
});

const App: React.FC = () => {
  const [tickers, setTickers] = useState<string[]>(['']);
  const [yearsBack, setYearsBack] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); 

  const handleTickerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await Api.getCompanyData(tickers, yearsBack);
      setData(response.data);
      setError(null);
      setTickers(['']);
      setYearsBack(1);
    } catch (error) {
      setError('Ticker not found');
    }
  };

  const handleAddTicker = () => {
    setTickers([...tickers, '']);
  };

  const handleTickerChange = (index: number, value: string) => {
    const newTickers = [...tickers];
    newTickers[index] = value;
    setTickers(newTickers);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, m: 4 }}>
        <Typography variant="h2" gutterBottom>
          Financial Data from the SEC
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter the ticker symbol of the publicly traded company you want to get
          financial data from. You can enter multiple tickers and specify how
          many years back you want to go. The data is pulled from the Edgar
          database.
        </Typography>
        <form onSubmit={handleTickerSubmit}>
          <TickerInput
            tickers={tickers}
            handleTickerChange={handleTickerChange}
          />
          <Button variant="contained" onClick={handleAddTicker} sx={{ mt: 2 }}>
            Add Ticker
          </Button>
          <YearsBackInput yearsBack={yearsBack} setYearsBack={setYearsBack} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Submit
          </Button>
        </form>
        {error && <Alert severity="error">{error}</Alert>}
        {data && <FinancialDataTable data={data} />}
      </Box>
    </ThemeProvider>
  );
};

export default App;
