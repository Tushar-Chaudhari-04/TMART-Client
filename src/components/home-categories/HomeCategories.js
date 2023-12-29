import React from 'react'
import "./HomeCategories.scss"
import Slider from "react-slick";
import { Navigate, useNavigate } from 'react-router-dom';

const HomeCategories = () => {
    const navigate=useNavigate();

    const homeSliderData=[
        {
            id: 1,
            name: "ColdDrinks & Juices",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/16913142-c1a3-49bd-bd15-9a68818dd3e8-imageWithName"
        },
        {
            id: 2,
            name: "Cleaning Essentials",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/776754fb-0209-4305-8f8d-4d9c626c6b30-imageWithName"
        },
        {
            id: 3,
            name: "Dairy,Bread & Eggs",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/954dd3f4-2b40-4cba-9e8c-d7cf2da47ac0-imageWithName"
        },
        {
            id: 4,
            name: "Biscuits",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-332-425,pr-true,f-webp,q-80/inventory/category/221b2f83-d4f6-4a22-886f-8c352f3ded3a-imageWithName"
        },
        {
            id: 5,
            name: "Packed Food",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-325-425,pr-true,f-webp,q-80/inventory/category/4cfc43e9-78b8-419c-8d03-6d0adcfa8729-imageWithName"
        },
        {
            id: 6,
            name: "Sweet & Cravings",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/0bb572e4-7c2a-472c-9d26-2c19cb8897ba-imageWithName"
        },
        {
            id: 7,
            name: "Masala & Dryfruits",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/dfbc7b23-ddd8-4c20-8b0c-4e8e3d5d2612-imageWithName"
        },
        {
            id: 8,
            name: "Muniches",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/bb61d61d-8654-4029-a0de-592f14563c82-imageWithName"
        },
        {
            id: 9,
            name: "Breakfast",
            url: "https://cdn.zeptonow.com/production///tr:w-210,ar-312-408,pr-true,f-webp,q-80/inventory/category/a936056e-08fc-4051-a471-504e0706c934-imageWithName"
        }
    ]

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1
    };

  return (
    <div className='homeSlider'>
    <h4>Explore By Categories</h4>
    <Slider {...settings} className='homeSlider'>
    {homeSliderData.map(item=>{
        return(
            <div className='homeSliderData'>
                <img src={item.url} onClick={()=>(navigate(`/categories/${item.name}`))}/>
            </div>
        )
    })}
    </Slider>
    </div>
  )
}

export default HomeCategories