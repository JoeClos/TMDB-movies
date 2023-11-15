import { Paper, InputBase} from "@mui/material";

const Search = ({ handleSearch }) => {
  return (
    <Paper
      component="form"
      elevation={3}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a movie..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Paper>
  );
};

export default Search;
