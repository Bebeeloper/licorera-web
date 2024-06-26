import { Checkbox, FormControlLabel, FormGroup, styled } from "@mui/material";
import { ReactNode } from "react";

interface CheckBoxProps {
  children?: ReactNode;
  style?: object;
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void; 
  disabled?: boolean;
  required?: boolean;
  checked: boolean;
  widthIcon?:number
}

const CheckBoxComponent: React.FC<CheckBoxProps> = ({
  children,
  style,
  disabled,
  required,
  checked,
  onChange,
  widthIcon = 16
}) => {

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 50,
    width: widthIcon,
    height: widthIcon,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        background: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      background: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));
  
  const BpCheckedIcon = styled(BpIcon)({
    background:  "#fff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: widthIcon,
      height: widthIcon,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23048404'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      background: "#fff",
    },
  });

  return (
    <FormGroup>
      <FormControlLabel
        style={style}
        required={required}
        disabled={disabled}
        control={
          <Checkbox
            size="large"
            sx={{  fontSize: 50  }}
            onChange={onChange}
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            checked={checked} 
          />
        }
        label={children}
      />
    </FormGroup>
  );
};

export default CheckBoxComponent;


