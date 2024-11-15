import './App.css';
import Grille from './components/Grille';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',       
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',  
        height: '100vh',   
        textAlign: 'center',  
        flexGrow: 1    
      }}
    >
      <h1>Jeu de mémoire</h1>
      <Grille />
    </Box>
  );
}

export default App;
