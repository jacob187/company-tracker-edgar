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
  return (
    <>
      {Object.entries(data).map(([ticker, financialData]) => (
        <Box key={ticker} mb={4}>
          <Typography variant="h6" gutterBottom component="div">
            {ticker}
          </Typography>
          {Object.entries(financialData).map(([category, values]) => (
            <TableContainer component={Paper} key={category}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>{category}</TableCell>
                    {Object.keys(values).map((quarter) => (
                      <TableCell key={quarter}>{quarter}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Value
                    </TableCell>
                    {Object.values(values).map((value) => (
                      <TableCell key={value}>
                        {formatter.format(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </Box>
      ))}
    </>
  );
}

export default FinancialDataTable;
