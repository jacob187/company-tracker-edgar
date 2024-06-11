import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface FinancialData {
  [key: string]: {
    [key: string]: number;
  };
}

interface FinancialDataTableProps {
  data: {
    [key: string]: FinancialData;
  };
}

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function FinancialDataTable({ data }: FinancialDataTableProps) {
  const allPeriods = new Set<string>();
  Object.values(data).forEach((financialData) =>
    Object.values(financialData).forEach((values) =>
      Object.keys(values).forEach((period) => allPeriods.add(period)),
    ),
  );

  const timePeriods = Array.from(allPeriods).sort();

  return (
    <>
      {Object.entries(data).map(([ticker, financialData]) => (
        <Box key={ticker} mb={4}>
          <Typography variant="h6" gutterBottom component="div">
            {ticker}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  {timePeriods.map((period) => (
                    <TableCell key={period}>{period}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(financialData).map(([category, values]) => (
                  <TableRow key={category}>
                    <TableCell component="th" scope="row">
                      {category}
                    </TableCell>
                    {timePeriods.map((period) => (
                      <TableCell key={period}>
                        {formatter.format(values[period] ?? 0)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </>
  );
}

export default FinancialDataTable;
