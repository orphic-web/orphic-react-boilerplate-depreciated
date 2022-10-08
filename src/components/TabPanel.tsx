import { Box } from '@mui/material';
import '../theme/css/global.css';

type Props = {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
};

const TabPanel: React.FC<Props> = ({
  children, dir, index, value,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

export default TabPanel;
