import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CardComponent from "../../shared/card/card.component";
import { useAppDispatch } from "../../../store/store";
import { Categories, CategoriesById } from "../../../store/modules/store/actions/store.actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContainerStore = () => {
  const [search, setSearch] = React.useState<string>("Menor Precio");
  const [categories, setCategories] = React.useState<any>([]);
  const [categorySelected, setCategorySelected] = React.useState<any>({});
  const [products, setProducts] = React.useState<any>([]);
  const dispatch = useAppDispatch();

  const searchOptions = [
    "Menor Precio",
    "Mayor Precio",
    "Alfabéticamente",
    "Recomendados",
    "Popularidad",
  ];

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleCategory = async (id:number) =>{
    const categoriesById = await dispatch(CategoriesById({id, page:1})).unwrap();
    setProducts(categoriesById.response.data.data)
    const categoryfilter = categories.filter((category:any)=>{
      return category.id === id
    })
    setCategorySelected(categoryfilter[0])
    console.log(categorySelected);
    
  }

  React.useEffect(() =>{
    async function getCategories(){
      const categories = await dispatch(Categories()).unwrap();
      console.log(categories.response.data);
      setCategories(categories.response.data)
      setCategorySelected(categories.response.data[0])

      const categoriesById = await dispatch(CategoriesById({id:1, page:1})).unwrap();
      console.log(categoriesById.response.data);
      setProducts(categoriesById.response.data.data)
    }
    getCategories()
  },[])

  return (
    <>  
      <Grid
        container
        spacing={2}
        style={{
          padding: '30px 5%'
        }}
      >
        <Grid item xs={12} style={{textAlign:'center'}}>
          <Typography style={storeStyles.category}>EXPLORA NUESTRAS CATEGORIAS</Typography>
        </Grid>
        <Grid item xs={12} style={{padding:'30px 0'}}>
          <Swiper style={{ height:'100%', width:'100%'}}
              modules={[Navigation, Pagination]}
              navigation={{
                  enabled: true
              }}
              loop={true}
              spaceBetween={2}
              slidesPerView={7}
          >
              {categories.map((item:any, index:any) => {
                  return(
                    <SwiperSlide key={index}  style={{textAlign:'center'}} onClick={() => handleCategory(item.id)}>
                      <img  height={'100px'} src={`${item.image}`} alt="" />
                      <Typography style={storeStyles.categorySubtitle}>{item.name}</Typography>
                    </SwiperSlide>
                  )
              })}
          </Swiper>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography style={storeStyles.search.label}>Ordenar por:</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              style={storeStyles.search.select}
              value={search}
              label="search"
              onChange={handleChange}
              name="search"
            >
              {searchOptions.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <img
            src={categories.length > 0 && categorySelected.banner }
            alt=""
            style={{
              borderRadius: "20px",
              maxHeight: "300px",
              width:"100%",
              objectFit: 'cover'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography style={storeStyles.category}>{categorySelected.name}</Typography>
        </Grid>
        <Grid container spacing={2}>
          {products.map((item:any) => {
            return (
              <Grid item xs={2.4} style={{textAlign:'center'}}>
                <CardComponent style={{ padding: "20px", borderRadius:"10px" }}>
                  <img src={item.image} alt="" width={200} height={200}/>
                  <Typography style={storeStyles.card.title}>
                    {item.name}
                  </Typography>
                  <Typography style={storeStyles.card.subtitle}>
                   {item.store.presentation}
                  </Typography>
                  <Typography style={storeStyles.card.content}>
                   {item.description.slice(0, 65)}
                  </Typography>
                  <Typography style={storeStyles.card.price}>
                   $ {item.store.price}
                  </Typography>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default ContainerStore;

//assign 0.64 % down 
const storeStyles = {
  category:{
    fontFamily: "HudsonNYSerif",
    fontSize: "32px",
    color: "#000000",
  },
  categorySubtitle:{
    fontFamily: "HudsonNYSerif",
    fontSize: "16px",
    color: "#000000",
  },
  card: {
    img: {},
    title: {
      fontFamily: "weblysleekuil",
      fontSize: "16px",
      fontWeigth: "600",
      color: "#000000",
      height: "110px",
    },
    subtitle: {
      fontFamily: "weblysleekuil",
      fontSize: "13px",
      color: "#000000",
    },
    content: {
      fontFamily: "weblysleekuil",
      fontSize: "19px",
      color: "#000000",
      paddingTop:"20px"
    },
    price: {
      fontFamily: "HudsonNYSerif",
      fontSize: "19px",
      color: "#000000",
      padding:"20px 0"
    },
  },
  search:{
    label:{
      fontFamily: "weblysleekuil",
      fontSize: "23px",
      color: "#000000",
    },
    select:{
      fontFamily: "weblysleekuil",
      fontSize: "23px",
      color: "#000000",
      marginTop: "-10px", 
      borderBottom: "none"
    }
  }
};
