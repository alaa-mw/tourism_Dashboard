export default[
    {
    "static_trip": {
        "id": 8,
        "source_trip_id": 1,
        "destination_trip_id": 2,
        "trip_name": "France Hi",
        "price": "665.00",
        "number_of_people": 20,
        "trip_capacity": 6,
        "start_date": "2024-06-20",
        "end_date": "2024-06-25",
        "stars": "0.00",
        "trip_note": "hi my friend",
        "type": "static",
        "rooms_count": 10
    },
    "activities": [
        {
            "id": 1,
            "name": "swimming"
        },
        {
            "id": 2,
            "name": "eating"
        }
    ],
    "source_trip": {
        "id": 1,
        "name": "Syria"
    },
    "destination_trip": {
        "id": 2,
        "name": "France"
    },
    "places": [
        {
            "id": 1,
            "name": "Eiffel Tower",
            "place_price": "20.00",
            "text": "This iconic iron lattice tower in Paris is not only a famous landmark but also an engineering marvel. Climb to the top for breathtaking views of the city and beyond",
            "area_id": 4,
            "visible": 1,
            "images": [
                {
                    "id": 1,
                    "place_id": 1,
                    "image": "PlaceImages/1718441623.png"
                },
                {
                    "id": 2,
                    "place_id": 1,
                    "image": "PlaceImages/1718441623.jpg"
                }
            ],
            "area": {
                "id": 4,
                "name": "Paris"
            }
        },
        {
            "id": 2,
            "name": "Musée du Louvre",
            "place_price": "20.00",
            "text": "Located in Paris, the Louvre is one of the world's most prestigious museums. It houses masterpieces like the Mona Lisa and the Venus de Milo",
            "area_id": 4,
            "visible": 1,
            "images": [
                {
                    "id": 3,
                    "place_id": 2,
                    "image": "PlaceImages/1718441633.png"
                },
                {
                    "id": 4,
                    "place_id": 2,
                    "image": "PlaceImages/1718441633.jpg"
                }
            ],
            "area": {
                "id": 4,
                "name": "Paris"
            }
        },
        {
            "id": 3,
            "name": "Umayyad Mosque",
            "place_price": "5.00",
            "text": "The Umayyad Mosque, also known as the Great Mosque of Damascus, is one of the most significant Islamic architectural masterpieces in the world. Located in the heart of Damascus, Syria, it is a testament to the grandeur and architectural prowess of the Umayyad Caliphate, which ruled from the 7th to the 8th century.",
            "area_id": 1,
            "visible": 1,
            "images": [
                {
                    "id": 5,
                    "place_id": 3,
                    "image": "PlaceImages/1718441637.png"
                },
                {
                    "id": 6,
                    "place_id": 3,
                    "image": "PlaceImages/1718441637.jpg"
                }
            ],
            "area": {
                "id": 1,
                "name": "Damascus"
            }
        }
    ],
    "going_trip": {
        "going_plane": {
            "id": 1,
            "name": "Damas A1"
        },
        "airport_source": {
            "id": 1,
            "name": "Syria A"
        },
        "airport_destination": {
            "id": 3,
            "name": "France A"
        }
    },
    "return_trip": {
        "return_plane": {
            "id": 3,
            "name": "PARIS A1"
        },
        "airport_source": {
            "id": 3,
            "name": "France A"
        },
        "airport_destination": {
            "id": 1,
            "name": "Syria A"
        }
    },
    "hotel": {
        "id": 1,
        "name": "Damascus Hotel"
    }
    }
]
