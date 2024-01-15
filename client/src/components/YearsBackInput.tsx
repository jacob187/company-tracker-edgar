import TextField from '@mui/material/TextField';

interface YearsBackInputProps {
  yearsBack: number;
  setYearsBack: (value: number) => void;
}

function YearsBackInput({ yearsBack, setYearsBack }: YearsBackInputProps) {
  return (
    <TextField
      type="number"
      placeholder="Enter number of years back"
      value={yearsBack}
      onChange={(event) => {
        const value = Number(event.target.value);
        setYearsBack(value < 1 ? 1 : value);
      }}
      fullWidth
      margin="normal"
    />
  );
}
export default YearsBackInput;
