import { Box, Grid, Typography } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen"
import ButtonComponent from "../shared/button/button.component";
import './PromotionDetails.css'
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../exchangeProducts/types";
import useCartHook from "../shared/hooks/cartHook/useCartHook";
import SuccessAlert from "../shared/modal/lottie.Alert";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const PromotionDetailScreen = () => {

    const location = useLocation();
    const productDetail = location?.state?.productDetail;
    const { addToCart } = useCartHook();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    console.log('productDetail: ', productDetail);
    
    
    const [count, setCount] = React.useState(1);

    const onMinus = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }

    const onPlus = () => {
        setCount(count + 1)
    }

    const setCart = () => {
        const newProduct: Product = {
          quantity: count,
          points: 0,
          price: productDetail?.price.replace(".",""),
          name: productDetail?.name || "",
          id: productDetail?.store_product_id || 0,
          image: productDetail?.image || "",
          description: productDetail?.description || "",
          category_id: 0,
          presentation: "",
          discount:0
        };
        if (productDetail) {
          addToCart(newProduct);
        //   setIsSuccess(false);
          setIsSuccess(true);
        }
    }

    return (
        <>
            <HeaderScreen/>
            <Box className='columnContainer'>
                <Grid container spacing={2} style={{ textAlign: "center" }}>
                    <Grid item  xs={12} sx={{ mt: 4, mr:4, ml:4 }}>
                        <img src={productDetail.image} alt="" style={{maxWidth:'100%', maxHeight:'600px', borderRadius: 20}}/>
                    </Grid>
                </Grid>
                <Typography sx={{ mt:4, }} style={{ textAlign:'center',fontFamily:'HudsonNYSerif', color:'#000000', fontSize:'200%'}}>
                    {productDetail.name}
                </Typography>
                <Typography  sx={{ mr:4, }} style={{marginBottom: '70px', textAlign:'left',fontFamily:'weblysleekuil', color:'#000000', fontSize:'150%'}}>
                    {productDetail.description}
                </Typography>
                <Typography  sx={{ mt: 2, mr:4, }} style={{ textAlign:'left', fontWeight:'600',fontFamily:'weblysleekuil', color:'#000000', fontSize:'125%'}}>
                    Válido hasta: {productDetail.end_date}
                </Typography>
                <Typography  sx={{ mt: 2, mr:4, mb: 4}} style={{ textAlign:'left', fontWeight:'600',fontFamily:'weblysleekuil', color:'#000000', fontSize:'125%'}}>
                    Precio: <span style={{marginLeft: '25px', fontFamily:'HudsonNYSerif', color:'#000000', fontSize:'200%'}}>$ {productDetail.price}</span>
                </Typography>
                {/* <div  style={{margin:'0 32px'}} >  */}
                    <Grid container spacing={2}>
                        <Grid item  xs={3} sx={{padding: '0 !important', mt: 2, mb:2, display: 'flex', alignItems: 'center'}}>
                            {/* <Box sx={{ width: '50px', height: '50px', borderRadius: '50%', ...displayFlex, cursor: 'pointer'}} onClick={onMinus} style={count === 1 ?  minusDisabled : {} }> */}
                            <Box sx={{ width: '50px', height: '50px', borderRadius: '50%', ...displayFlex}} onClick={onMinus}>
                                {/* <Typography sx={{fontSize: '50px', color: 'white', transform: 'translateY(-3px)', userSelect: 'none'}}>-</Typography> */}
                                {/* <img style={count === 1 ? {width: '120%', opacity: 0.4, cursor: 'no-drop'} : {width: '120%', cursor: 'pointer'}} src="/icons/Minus.png" alt="minus sign" /> */}
                                <FaMinusCircle style={count === 1 ? {width: '100%', height: '100%', color:'#fdbd0063', fontSize: '20px', cursor:'no-drop'} : {width: '100%', height: '100%', color:'#fdbd00', fontSize: '20px', cursor:'pointer'}}/>
                            </Box>
                            <span className="normalText"> {count} </span> 
                            <Box sx={{width: '50px', height: '50px', borderRadius: '50%', ...displayFlex, cursor: 'pointer'}} onClick={onPlus}>
                                {/* <Typography sx={{fontSize: '50px', color: 'white', userSelect: 'none'}}>+</Typography> */}
                                {/* <img style={{width: '120%'}} src="/icons/Plus.png" alt="minus sign" /> */}
                                <FaPlusCircle style={{width: '100%', height: '100%', color:'#fdbd00', fontSize: '20px', cursor:'pointer'}}/>
                            </Box>
                        </Grid>
                        <Grid item  xs={9} sx={{padding: '0 !important', mt: 2, mb:2, display: 'flex', alignItems: 'center'}}>
                            <ButtonComponent style={styleButtonChecked}>
                                <Typography
                                    style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif", cursor: 'pointer' }}
                                    onClick={setCart}
                                >
                                AGREGAR
                                </Typography>
                            </ButtonComponent>
                        </Grid>
                    </Grid>
                {/* </div> */}
            </Box>
            {isSuccess && <SuccessAlert setOpen={setIsSuccess} />}
            <FooterScreen />
        </>
        
    );
}

export default PromotionDetailScreen;


const styleButtonChecked = {
    width: "100%",
    height: "43px",
    background: "#99791C",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    // marginTop: "20px",
};

const minusDisabled ={
    background:"#fdbd0063"
}