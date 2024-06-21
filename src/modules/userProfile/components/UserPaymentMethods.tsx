import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllPaymentMethods } from "../../../store/modules/paymentMethods";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { Typography } from "@mui/material";
import { selectAllUser } from "../../../store/modules/users";
import { useEffect, useState } from "react";
import { DeletePaymentMethod } from "../../../service/modules/paymentMethods/types";
import { useAppDispatch } from "../../../store/store";
import { deletePaymentMethodsThunk } from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { AddPaymentInterface } from "./types";

const UserPaymentMethods = (props: AddPaymentInterface) => {

  const { setPaymentMethodsOpen } = props;

  const paymentMethodsRedux = useSelector(selectAllPaymentMethods); 
  console.log('paymentMethodsRedux: ', paymentMethodsRedux);
  
  const user = useSelector(selectAllUser);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [itemToRemove, setItemToRemove ] = useState<DeletePaymentMethod>({
    token: "",
    franchise: "",
    mask: ""
  });

  useEffect(() => {
    if(itemToRemove.token !== '' && itemToRemove.franchise !== '' && itemToRemove.mask !== '') {
      dispatch(deletePaymentMethodsThunk({reqData: itemToRemove})).unwrap();
    }
  }, [itemToRemove]);

  const handleShowAlert = () => {
    setShowAlert(true);
  }

  const handleRemove = (item: DeletePaymentMethod) => {
    const newItemToRemove = {
      token: item.token,
      franchise: item.franchise,
      mask: item.mask
    }
    setItemToRemove(newItemToRemove);
  }

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleClick = () => setPaymentMethodsOpen(true);

  return (
    
    <Box sx={{width: '100%', height: '100%'}}>
      <Box sx={{padding: '60px 5%', width: '100%', height: '88%', overflow: 'auto'}}>
          {paymentMethodsRedux?.length > 0 ? paymentMethodsRedux?.map((item: any, index: any) => (
            <Box key={item.token} sx={{marginTop: '30px', padding: '0 0 20px 0', width: '100%', height: '25%', ...displayFlex, borderBottom: '1px solid gray' }}>
              <figure style={{width: '10%', height: '100%', ...displayFlex}}>
                <img style={{height: '50%'}} src="/icons/credit-card-color.png" alt="credit card color icon" />
              </figure>
              <Box sx={{width: '80%'}}>
                <Typography sx={{fontFamily: 'weblysleekuisb', fontSize: '20px'}}>{item.mask}</Typography>
                <Typography sx={{fontFamily: 'weblysleekuil', fontSize: '16px'}}>{user.name} {user.last_name}</Typography>
              </Box>
              <figure style={{width: '10%', height: '100%', ...displayFlex}}>
                {/* <img style={{height: '40%'}} src="/icons/trash.png" alt="credit card color icon" onClick={(() => handleRemove(item))}/> */}
                <img style={{height: '40%', cursor: 'pointer'}} src="/icons/trash.png" alt="credit card color icon" onClick={handleShowAlert}/>
              </figure>
              <ModalAlertComponent
                handleClose={handleAlertClose}
                handleSave={() => handleRemove(item)}
                open={showAlert}
                isCancellButton={true}
                data={{
                  title: item.mask,
                  content:`¿Seguro que quieres eliminar esta tarjeta?`,
                  img:`/icons/alert.png`
              }}/>
            </Box>
          ))
          :
            <Box sx={{width: '100%', height: '100%', ...displayFlexColumn}}>
              <Typography sx={{fontFamily: 'HudsonNYSerif'}}>aun no tienes tarjetas guardadas</Typography>
              <Typography sx={{fontFamily: 'weblysleekuil'}}>agrega una para continuar</Typography>
            </Box>
        }
        
      </Box>
      <Button 
          // sx={styles.button}
          sx={{height: '12%', fontFamily: 'HudsonNYSerif', fontSize: '18px'}}
          variant="outlined" 
          fullWidth 
          color="inherit" 
          onClick={handleClick}
      >
          {/* {edit ? 'Guardar' : 'Editar'} */}
          Agregar
      </Button>
    </Box>
  );
};

export default UserPaymentMethods;
