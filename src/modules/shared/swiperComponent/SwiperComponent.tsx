// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { swiperType } from './types/types';
import { displayFlex, displaySpaceBetween } from '../recursiveStyles/RecursiveStyles';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllPromotion } from '../../../store/modules/promotions';
import { Promotion } from '../../../store/modules/promotions/types';
import StringDateFormat from '../hooks/stringDateFormat/StringDateFormat';
import NumberFormat from '../hooks/numberFormater/NumberFormat';
import { useMemo } from 'react';
import { selectAllCampaigns } from '../../../store/modules/campaigns';

const SwiperComponent = (props: swiperType) => { 
    
    const { modules, slidesPerView, loadingStatus, bannerType } = props;
    const promotionsDataredux = useSelector(selectAllPromotion);
    const campaingDataredux = useSelector(selectAllCampaigns);
    console.log('Angela: ', campaingDataredux);
    
    const selector: any = bannerType === 'Promotions' ? promotionsDataredux : campaingDataredux;

    const formattedDates = useMemo(
        () => promotionsDataredux.map((item: Promotion) => StringDateFormat(item.end_date)),
        [promotionsDataredux]
    );
      
    const formattedNumbers = useMemo(
        () => promotionsDataredux.map((item: Promotion) => NumberFormat(item.price)),
        [promotionsDataredux]
    );
    return(
        <Swiper style={styles.swiper}
            modules={modules}
            navigation={{
                enabled: true
            }}
            pagination={{
                clickable: true,
            }}
            loop={true}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper: any) => console.log(swiper)}
        >
            {/* {promotionsDataredux.map((item: Promotion, index) => { */}
            {selector.map((item: any, index: any) => {
                return(
                    <SwiperSlide key={index} style={styles.swiper.swiperSlide}>
                            {loadingStatus === 'loading' ? 
                                <Skeleton sx={styles.swiper.swiperSlide.skeleton} variant="rectangular" height={'90%'} />
                            :
                                <Box sx={styles.swiper.swiperSlide.promotionContainer}>
                                    {/* <img height={'100%'} src={`${img}`} alt="" /> */}
                                    <img style={styles.swiper.swiperSlide.promotionContainer.image} src={`${bannerType === 'Promotions' ? item.image : item.mainImageUrl}`} alt={item.name} />
                                    {bannerType === 'Promotions' && (
                                        <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer}>
                                            <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header}>
                                                <h1 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>{item.name}</h1>
                                                <h2 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>$ {formattedNumbers[index]}</h2>
                                            </Box>
                                            <p style={{marginBottom: '30px'}}>{item.description}</p>
                                            <p>Válido hasta: {formattedDates[index]}</p>
                                        </Box>
                                    )}
                                </Box>
                            }
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );

}

const styles = {
    swiper: {
        height: '100%',
        maxWidth: '1450px',
        swiperSlide: {
            ...displayFlex,
            cursor: 'pointer',
            skeleton: {
                width: '100%', 
                maxWidth: '1000px', 
                borderRadius: '20px'
            },
            promotionContainer: {
                position: 'relative', 
                height: '90%', 
                borderRadius: '20px', 
                display: 'inline-block', 
                overflow: 'hidden',
                image: {
                    height: '100%'
                },
                descriptionContainer: {
                    position: 'absolute', 
                    padding: '20px', 
                    width: '100%' , 
                    bottom: 0, 
                    border: '1px solid black', 
                    borderBottomLeftRadius: '20px', 
                    borderBottomRightRadius: '20px', 
                    backgroundColor: 'white',
                    header: {
                        marginBottom: '10px',
                        ...displaySpaceBetween,
                        title: {
                            fontFamily: 'HudsonNYSerif',
                            fontWeight: 600
                        },
                        price: {
                            fontFamily: 'HudsonNYSerif',
                            fontWeight: 600
                        }
                    }
                }
            }
        }
    }
}

export default SwiperComponent;