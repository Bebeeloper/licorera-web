import { Box, Divider, Grid, Typography } from "@mui/material";
import DrawerComponent from "../shared/drawer/drawer.component";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../shared/recursiveStyles/RecursiveStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../store/modules/cart/selectors/cart.selector";
import CardComponent from "../shared/card/card.component";
import useCartHook from "../shared/hooks/cartHook/useCartHook";
import "./cart.screen.css"
import { Product } from "../exchangeProducts/types";
import { CurrencyFormat, JotaFormat } from "../../utils/helpers";
import ButtonComponent from "../shared/button/button.component";

interface cartInterface {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Cart: React.FC<cartInterface> = ({ open, toggleDrawer }) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const products = useSelector(selectCartProducts);
    const [total, setTotal] = useState<number>(0);
    
    const { removeCartItem, updateCartItem } = useCartHook();

    const onMinus = (product:Product) => {
        if(product.quantity > 1){
            const updatedProduct = { ...product, quantity: product.quantity - 1 };
            updateCartItem(updatedProduct)
        }
    }

    const onPlus = (product:Product) => {
        const updatedProduct = { ...product, quantity: product.quantity + 1 };
        updateCartItem(updatedProduct)
    }

    const removeProduct = (id:number) =>{
        removeCartItem(id)
    }

    useEffect(() => {
        if(products.length === 0){
            setIsEmpty(true)
        }
        let newtotal = 0;
        products.forEach((item)=>{
            if(item.price){
                newtotal =+ item.quantity * item.price
            }
        })
        setTotal(newtotal);
    },[products])
    
    return (
        <DrawerComponent open={open} anchor="right" toggleDrawer={toggleDrawer}>
        <Box sx={{ width: 350, textAlign: 'center'}} role="presentation">
            {isEmpty && (
                <>
                <Typography style={style.emptyCart.title}>TU CARRITO</Typography>
                <Typography style={style.emptyCart.subTitle}>tu carrito está vacio</Typography>
                <img src="/images/empty_phone.png" alt="" width={100}/>
                <Typography style={style.emptyCart.text} >Todo lo que necesitas en un solo lugar</Typography>
                </>
            )}
            {!isEmpty && (
                <>
                <Typography style={style.emptyCart.title}>TU CARRITO</Typography>
                <div style={{padding: '20px'}}>
                    {products.map((item: any) => {
                    return (
                        <CardComponent
                        style={{ padding: "10px", marginBottom: '10px',borderRadius: "10px",  cursor: 'pointer' }}
                        >
                        <Grid
                                className="columnContainer"
                                container
                                spacing={0}
                                style={{}}
                            >
                                <Grid item xs={3}>
                                    <img src={item.image} alt="" width={100} height={100} />
                                </Grid> 
                                <Grid item xs={6}>
                                    <Typography style={style.cards.title}>{item.name}</Typography>
                                    <Typography style={style.cards.quantity} ></Typography>
                                </Grid>
                                <Grid item  xs={3} sx={{ mt: 0, mb:0}}>
                                    <img style={style.cards.close} src="/icons/vector_close.png" onClick={() => removeProduct(item.id)} />
                                    <Typography style={style.cards.price} sx={{mt:5,  mb:-1}} >{item.points ? JotaFormat(item.points) : CurrencyFormat(item.price)}</Typography>
                                    <div  className="iconContainer" onClick={() => onMinus(item)} style={item.quantity === 1 ?  minusDisabled : {width:"20px", height:"20px"} }>
                                        <span className="icon" id="icono-menos" style={{fontSize: '30px', margin: '-7px 0 0 -12px'}}>-</span>
                                    </div>
                                    <span className="normalText" style={{margin: '0px', fontSize:'18px'}}> {item.quantity} </span> 
                                    <div  className="iconContainer" onClick={() => onPlus(item)} style={{width:"20px", height:"20px"}}>
                                        <span className="icon" id="icono-mas" style={{fontSize: '30px', margin: '-7px 0 0 -19px'}}>+</span>
                                    </div>
                                </Grid>
                            </Grid>   
                        </CardComponent>
                    )
                    })}
               
                <Typography style={style.footer.title}>Obtienes por tu compra 101 J</Typography>
                <Divider />
                <Grid
                    container
                    spacing={0}
                    style={{
                       padding: "20px 0",
                    }}
                >
                    <Grid item  xs={6} style={style.footer.textLeft}>TOTAL:</Grid>
                    <Grid item  xs={6} style={style.footer.textRigth}>{CurrencyFormat(total)}</Grid>
                </Grid>
                <Typography style={style.footer.text}>Domicilio gratis por compras mayores a $ %@ IVA incluido.</Typography>
                <ButtonComponent style={style.footer.button}>IR A PAGAR</ButtonComponent>
                </div>
                </>
            )}
        </Box>
        </DrawerComponent>
    );
};
export default Cart;

const style: React.CSSProperties | any = {
    emptyCart:{
        title:{
            ...hudsonNYFontStyle,
            padding: '25px 0',
            background: '#404040',
            color: '#FFFFFF',
            fontSize:"20px"
        },
        subTitle:{
            ...hudsonNYFontStyle,
            padding: '20px 0',
        },
        text:{
            ...weblysleekFontStyle,
            padding: '20px 0',
            fontSize:"12px"
        }
    },
    cards:{
        title:{
            ...weblysleekFontStyle,
            fontWeight:"600",
            position: 'relative',
            bottom: '10px'
        },
        subtitle:{
            ...weblysleekFontStyle,
            fontWeight:"300"
        },
        quantity:{
            ...weblysleekFontStyle,
            marginTop: '30px',
            fontWeight:"600"
        },
        close:{
            float: 'right'
        },
        price:{
            ...hudsonNYFontStyle,
            fontSize:"15px"
        }
    },
    footer:{
        title:{
            ...weblysleekFontStyle,
            fontSize:"14px",
            padding: '20px 0',
            fontWeight:"600"
        },
        textLeft:{
            ...hudsonNYFontStyle,
            textAlign:"left",
            fontSize:"16px" ,
        },
        textRigth:{
            ...hudsonNYFontStyle,
            textAlign:"right",
            fontSize:"16px"
        },
        text:{
            ...weblysleekFontStyle,
            fontSize:"12px",
            paddingBottom:"10px",
            color:"#4F4F4F"
        },
        button:{
            ...hudsonNYFontStyle,
            fontSize: "22px",
            background:"#FFFFFF",
            width: '100%',
            height: '40px',
            borderRadius: '5px',
            padding: '0 0 8px 0',
            cursor:"pointer",
            border: '1px solid #000000'
        }
    }
}
const minusDisabled ={
    background:"#fdbd0063",
    width:"20px", 
    height:"20px"
}