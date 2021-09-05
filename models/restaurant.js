class Restaurant {
  constructor(
    _id,
    bank_info = {},
    category = "",
    cuisine_type = "",
    commission = "",
    city = "",
    state = "",
    plan = {},
    documents = [],
    meals = [],
    restaurant_name = "",
    phone = "",
    email = "",
    locality = "",
    postal_code = "",
    owner_name = "",
    status = "",
    about = "",
    meal_type = "",
    rating = "",
    reviews = []
  ) {
    this._id = _id;
    this.bank_info = bank_info;
    this.category = category;
    this.cuisine_type = cuisine_type;
    this.commission = commission;
    this.city = city;
    this.state = state;
    this.plan = plan;
    this.documents = documents;
    this.meals = meals;
    this.restaurant_name = restaurant_name;
    this.phone = phone;
    this.email = email;
    this.locality = locality;
    this.postal_code = postal_code;
    this.owner_name = owner_name;
    this.status = status;
    this.about = about;
    this.meal_type = meal_type;
    this.rating = rating;
    this.reviews = review;
  }
}

export default Restaurant;
