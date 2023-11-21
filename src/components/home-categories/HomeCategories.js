import React from 'react'
import "./HomeCategories.scss"

const HomeCategories = () => {
    const homeCategories = [
        {
            id: 1,
            name: "Fruits and Vegetables",
            url: "https://cdn.zeptonow.com/production///tr:w-420,ar-498-306,pr-true,f-webp,q-80/inventory/IMAGE/9a990120-8b09-4568-aaa8-25d1caec3d46-fnv_enlarged_v2_old.png"
        },
        {
            id: 2,
            name: "Atta & Rice",
            url: "https://cdn.zeptonow.com/production///tr:w-420,ar-498-306,pr-true,f-webp,q-80/inventory/IMAGE/850b944e-0dc3-4eab-b39d-130949a57a33-aata_enlarged_v2_old.png"
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
    return (
        <div className='homecategories'>
            <h4>Explore By Categories</h4>
            <div className='category-section'>
                {homeCategories.map(item => {
                    return (
                        <div key={item.id} className='category-item'>
                            <img src={item.url} alt={item.name} />
                        </div>
                    )

                })}
            </div>

        </div>
    )
}

export default HomeCategories