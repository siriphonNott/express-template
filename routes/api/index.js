const router = require('express').Router()
const auth = require('../auth')

router.get('/business/:id', (req, res)=>{
    res.send({
        "id": 1,
        "created_at": "2020-01-29 04:20:39",
        "updated_at": "2020-01-29 04:20:39",
        "deleted_at": null,
        "created_by": null,
        "updated_by": null,
        "deleted_by": null,
        "slug": "smile-resort",
        "name": "Smile Resort",
        "branch_name": "ชลบุรี",
        "business_type_id": 2,
        "business_class_id": 1,
        "description": "รีสอร์ทแนวธรรมชาติ สำหรับพักผ่อน",
        "address": "21/21 ม.5 ต.ช่องไม้แก้ว อ.ทุ่งตะโก จ.ชุมพร 86220",
        "district_id": null,
        "subdistrict_id": null,
        "province_id": null,
        "postcode": null,
        "latitude": null,
        "longitube": null,
        "keywords": null,
        "tags": null,
        "promotion_start_at": null,
        "promotion_end_at": null,
        "privacy": null,
        "rating": null,
        "price_min": "500",
        "price_max": 5000,
        "contact_address": null,
        "contact_telephone": "",
        "contact_mobile": "098245345",
        "contact_fax": "071243546",
        "contact_email": "cafe@gmail.com",
        "social_homepage": "http://cafe.com",
        "social_facebook": "notcoe",
        "social_line": "iamnotcoe",
        "social_instagram": "siriphonnot",
        "social_youtube": "",
        "social_twitter": "",
        "owners": null,
        "presenters": null,
        "banners": null,
        "facilities": null,
        "is_dayoff": 0
    })
})

router.get('/business/:id/contents', (req, res) =>{
    
    res.send({
        "current_page": 1,
    "data": [
        {
            "id": 1,
            "created_at": "2020-01-29 05:51:55",
            "updated_at": "2020-01-29 05:51:55",
            "deleted_at": null,
            "created_by": null,
            "updated_by": null,
            "deleted_by": null,
            "business_id": 1,
            "slug": "อาหารน่ากิน",
            "title": "อาหารน่ากิน",
            "detail": "อาหารน่ากิน 10 อย่าง",
            "thumbnail": [{img: "http://localhost:8008/storage/app/media/chinese-new-year-food-feast.jpg"},{img: "https://positioningmag.com/wp-content/uploads/2019/10/open_mcdonaldPlantbased1.jpg"}],
            "content": [
                {
                    "content": "<p>อาหารน่ากิน 10 อย่าง</p>\r\n",
                    "_group": "content"
                },
                {
                    "image": "/hero agri food.jpg",
                    "_group": "image"
                }
            ],
            "category_id": null,
            "promotion_id": null,
            "price": null,
            "viewed_count": 0,
            "favorited_count": 0,
            "shared_count": 0,
            "rating": 0
        }
    ],
    "first_page_url": "http://localhost:8008/api/businesses/1/contents?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://localhost:8008/api/businesses/1/contents?page=1",
    "next_page_url": null,
    "path": "http://localhost:8008/api/businesses/1/contents",
    "per_page": 15,
    "prev_page_url": null,
    "to": 1,
    "total": 1
    })
})

router.use('/users', require('./user'))
router.use('/posts', auth.required, require('./post'))

module.exports = router