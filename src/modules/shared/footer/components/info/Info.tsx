import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { displayFlexColumn } from "../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../paletteColors/paletteColors";

const Info = () => {
    return(
        <Box sx={styles.infoContainer}>
            <Link to={'/aboutus'}>Quienes somos</Link>
            <Link to={'/'}>Sugerencias</Link>
            <Link to={'/'}>Términos y condiciones</Link>
            <Link to={'/'}>Eliminar mis datos</Link>
            <Link to={'/'}>Crear cuenta</Link>
        </Box>
    );

}

const styles = {
    infoContainer: {
        width: '33.3%',
        ...displayFlexColumn,
        borderRight: `1px solid ${paletteColors.black}`,
        borderLeft: `1px solid ${paletteColors.black}`,
        'a': {
            marginBottom: '10px',
            textDecoration: 'none',
            fontFamily: 'weblysleekuisb',
            color: paletteColors.black
        }
    }
}

export default Info;