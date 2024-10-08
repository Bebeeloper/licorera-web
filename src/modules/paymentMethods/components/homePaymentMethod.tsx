import { Padding } from "@mui/icons-material";
import ButtonComponent from "../../shared/button/button.component";
import { hudsonNYFontStyle, weblysleekBoltFontStyle  } from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePaymentHook, { PaymentSelected } from "../../shared/hooks/paymentHook/usePaymentHook";

interface Props{
  updateOrder: () => void;
}

const HomePaymentMethod:React.FC<Props> = ({updateOrder}) => {
    const [buttonSelect, setButtonSelect] = useState<number>(0)
    const [isValid, setIsValid] = useState<boolean>(false)
    const navigate = useNavigate();
    const { addToPayment } = usePaymentHook()

    const selectPayment = (id:number) => {
        const type = id === 1 ? "Efectivo" : "Tarjeta débito/crédito"
        const payment:PaymentSelected = {
            type: type,
            payment:""
        }
        addToPayment(payment)
        setIsValid(true)
        setButtonSelect(id)
    }
    const goToCheckout = () => {
      updateOrder()
    }
  return (
    <>
      <ButtonComponent
        onClick={()=>selectPayment(1)}
        style={{...styleButton.button, marginTop: '50px'}}
        className=""
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            Efectivo
            {buttonSelect === 1 && <img src="/icons/Checked.png" alt="" width={30}/>}
       </div>
      </ButtonComponent>
      <ButtonComponent
        onClick={()=>selectPayment(2)}
        style={styleButton.button}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            Tarjeta débito/crédito
            {buttonSelect === 2 && <img src="/icons/Checked.png" alt="" width={30}/>}
        </div>
      </ButtonComponent>
      <ButtonComponent
          disabled={!isValid}
          onClick={goToCheckout}
          style={isValid ? styleButton.submitButton : styleButton.disabledButton}
        >
          CONTINUAR
        </ButtonComponent>
    </>
  );
};

export default HomePaymentMethod;


const styleButton = {
    button:{
        ...weblysleekBoltFontStyle,
        fontSize: "18px",
        background: "#FFFFFF",
        width: "100%",
        height: "60px",
        borderRadius: "5px",
        cursor: "pointer",
        border: "1px solid #000000",
        marginTop:"20px",
        textAlign:"left",
        padding:"10px"
    },
    submitButton: {
        ...hudsonNYFontStyle,
        fontSize: "18px",
        background: "#FFFFFF",
        width: "100%",
        height: "60px",
        borderRadius: "5px",
        // padding: "0 0 8px 0",
        cursor: "pointer",
        border: "1px solid #000000",
        marginTop:"250px",
      },
      disabledButton: {
        ...hudsonNYFontStyle,
        fontSize: "18px",
        background: "#D1D1D1",
        width: "100%",
        height: "60px",
        borderRadius: "5px",
        // padding: "0 0 8px 0",
        cursor: "pointer",
        color: "#FFFFFF",
        border: "none",
        marginTop:"250px",
      },
}