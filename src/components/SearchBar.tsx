import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    setSearchQuery: any,
}

const SearchBar: React.FC<Props> = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target);
      }}
      label="Search by name"
      variant="outlined"
      placeholder="Search..."
      size="small"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />

  </form>
);

export default SearchBar;
