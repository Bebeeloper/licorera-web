import { Box, Typography } from "@mui/material";
import { displaySpaceBetween } from "../shared/recursiveStyles/RecursiveStyles";
import { useSelector } from "react-redux";
import { selectAllCampaigns } from "../../store/modules/campaigns";
import { useEffect, useState } from "react";
import { PromotionCampaign } from "../../store/modules/campaigns/types";
import { useNavigate } from "react-router-dom";

const Experience = () => {

    const navigate = useNavigate();
    const campaignsDataRedux = useSelector(selectAllCampaigns);
    const [ campaignProducts, setCampaignProducts ] = useState<PromotionCampaign[]>([]);

    function generateRandomNumbers(arrayLength: number) {
        var number1 = Math.floor(Math.random() * arrayLength) + 1;
        var number2;
        
        do {
            number2 = Math.floor(Math.random() * arrayLength) + 1;
        } while (number2 === number1);
    
        return [number1, number2];
    }

    useEffect(() => {
        let arrayImages: string [] = [];
        let campaignProducts: PromotionCampaign [] = [];
        const ramdonNumbers: number [] = generateRandomNumbers(campaignsDataRedux.length - 1);
        console.log('Números random obtenidos: ', generateRandomNumbers(campaignsDataRedux.length - 1));
        for (let index = 0; index < campaignsDataRedux.length; index++) {
            if (ramdonNumbers.includes(index)) {
                arrayImages.push(campaignsDataRedux[index].mainImageUrl);
                campaignProducts.push({
                    id: campaignsDataRedux[index].id,
                    name: campaignsDataRedux[index].name,
                    description: campaignsDataRedux[index].description,
                    mainImageUrl: campaignsDataRedux[index].mainImageUrl,
                    secondImageUrl: campaignsDataRedux[index].secondImageUrl,
                    type: campaignsDataRedux[index].type,
                    categoryId: campaignsDataRedux[index].categoryId,
                    categoryName: campaignsDataRedux[index].categoryName,
                });
            }
        }
        setCampaignProducts(campaignProducts);
    }, [campaignsDataRedux]);

    const handleClick = (item: PromotionCampaign) => { 
        let highlightedCampaign: PromotionCampaign;
        highlightedCampaign = {
            id: item.id,
            name: item.name,
            description: item.description,
            mainImageUrl: item.mainImageUrl,
            secondImageUrl: item.secondImageUrl,
            type: item.type,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
        }
        navigate('/highlighted-campaigns', {state: {highlightedCampaign}});
    }

    return(
        <Box className='columnContainer' sx={styles.experiencesContainer}>
            <Typography sx={styles.experiencesContainer.subtitle}>las mejores experiencias</Typography>
            <Box sx={styles.experiencesContainer.imageContainer}>
                {campaignProducts.map((item: PromotionCampaign, index: any) => (
                    <img onClick={() => handleClick(item)} key={index} style={styles.experiencesContainer.imageContainer.image}  src={item.mainImageUrl} alt={`Campaign: ${index}`} />
                ))}
            </Box>
        </Box>
    );
}

const styles = {
    experiencesContainer: {
        subtitle: {
            margin: '50px 0 30px 0',
            fontFamily: 'HudsonNYSerif',
            fontWeight: 600,
            fontSize: '25px',
        },
        imageContainer: {
            width: '100%',
            ...displaySpaceBetween,
            image: {
                width: '49%',
                borderRadius: 20,
                cursor: 'pointer',
            }
        }
    }
}

export default Experience;