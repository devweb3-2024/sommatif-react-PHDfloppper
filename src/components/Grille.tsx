import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Interface from './Hud';


const images = ['./chat1.png', './chat2.png', './chat3.png', './chat4.png', './chat5.png',
                 './chat6.png', './chat7.png', './chat8.png','./chat1.png', './chat2.png',
                  './chat3.png', './chat4.png', './chat5.png','./chat6.png', './chat7.png', './chat8.png'];

const dos = './dessus-carte.svg'                  

function Grille() {
  const [brasserImages, setBrasserImages] = useState<string[]>([]);
  const [cartesRetournees, setCartesRetournees] = useState<number[]>([]);
  const [cartesTrouvees, setCartesTrouvees] = useState<number[]>([]);
  const [coupRestant, setCoupRestant] = useState<number>(20);
  const [gagne, setgagne] = useState<boolean>(false);

  // Mélanger le tableau de chat
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));   //source pour le random: https://www.geeksforgeeks.org/how-to-generate-random-number-in-react-js/
      [array[i], array[j]] = [array[j], array[i]]; //échange les valeurs entre i et j. source: https://www.w3schools.com/react/react_es6_destructuring.asp
    }
    return array;
  };

  // Initialiser le jeu (le tableau avec les images mélangés quand le site web est initialisé et le nombre de coup)
  useEffect(() => {
    const brasse = shuffleArray(images);
    setBrasserImages(brasse);
  }, []);

  // appelé que le user clique sur une carte
  const handleClick = (index: number) => {
    if (cartesTrouvees.includes(index) || cartesRetournees.includes(index)) { //return selon si le chat est dans les cartes retournés ou dans les cartes trouvés
      return;
    }
    if(coupRestant <= 0)
    {
        return;
    }

    const nouvellesCartesRetournees = [...cartesRetournees, index];

    if(cartesRetournees.length<2){                 //empêche d'avoir plus que 2 cartes de retourné
    setCartesRetournees(nouvellesCartesRetournees);
    }

    if (nouvellesCartesRetournees.length === 2) {
      const [premiereCarte, deuxiemeCarte] = nouvellesCartesRetournees;
      if (brasserImages[premiereCarte] === brasserImages[deuxiemeCarte]) {  //compare les deux cartes retourné et agis selon le résultat
        setCartesTrouvees([...cartesTrouvees, premiereCarte, deuxiemeCarte]);
        if(cartesTrouvees.length>=14)
        {
            setgagne(true);  //met fin a la partie sur le user à trouvé toute les carte
        }
      }else{
        setCoupRestant(coupRestant-1);
      }

      setTimeout(() => {
        setCartesRetournees([]); //recache les cartes après un délais de 1 seconde source:https://stackoverflow.com/questions/36270422/reactjs-settimeout-not-working
      }, 1000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 ,width:'30%',height: '30%',}}>
      <Grid container spacing={3}>
        {brasserImages.map((image, index) => (  //je me suis inspiré de la grille dans le formatif pour y arriver. aussi de https://stackoverflow.com/questions/67394925/how-to-make-3-column-grid-with-map-function-react
                    //source qui m'a aidé à comprendre xs: https://mui.com/material-ui/react-grid/
          <Grid item xs={3} key={index}>       
            <Box
              component="img"
              src={
                    cartesTrouvees.includes(index) || cartesRetournees.includes(index) ? image : dos //affiche le chat ou le dos selon si le chat est présent ou non dans les cartes retournés ou dans les cartes trouvés
                    }
              onClick={() => handleClick(index)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Interface coupRestant={coupRestant} gagne={gagne}/>
    </Box>
  );
}

export default Grille;
