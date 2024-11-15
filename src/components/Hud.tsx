import { Box,Button } from '@mui/material';     
import { useEffect, useState } from 'react';   

interface HudProps {
    coupRestant: number;
    gagne: boolean;
  }

function Hud({ coupRestant,gagne }: HudProps) {
    const [message, setMessasge] = useState<string>('');

  // Fonction pour rafraîchir la page, montré en classe, sinon autre source: https://stackoverflow.com/questions/41481522/how-to-refresh-a-page-using-react-route-link
  const handleRefresh = () => {
    window.location.reload(); // Rafraîchit la page
  };

  //appelé quand coupRestant change
  useEffect(() => {
    if(coupRestant<=0)
    {
        setMessasge('Vous avez perdu!');
    }
  }, [coupRestant]);

  //appelé quand gagne change
  useEffect(() => {
    if(gagne)
    {
        setMessasge('Vous avez gagné!');
    }
  }, [gagne]);

  return (
    <Box sx={{flexGrow: 1,padding: 2}}>
        <h2>{message}</h2>
        <h2>Coup restant: {coupRestant}</h2>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleRefresh}
            sx={{ marginBottom: 2 }}
            >
            Recommencer
        </Button>
      </Box>
  );
}

export default Hud;
