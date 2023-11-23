import Hotel from '../models/Hotel.js';
import Room from '../models/room.js';

//CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel hasbeen deleted.');
  } catch (err) {
    next(err);
  }
};

//GET
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
//Hotel price check(minimum and maximum)
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 1000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
//count by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
//count by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const appartmentsCount = await Hotel.countDocuments({ type: 'Appartments' });
    const resortsCount = await Hotel.countDocuments({ type: 'Resorts' });
    const villasCount = await Hotel.countDocuments({ type: 'Villas ' });
    const cabinCount = await Hotel.countDocuments({ type: 'Cabin House' });
    const cottagesCount = await Hotel.countDocuments({ type: 'cottages' });
    const serviceCount = await Hotel.countDocuments({ type: 'Service Appartments' });
    const vacationCount = await Hotel.countDocuments({ type: 'Vacation Appartments' });
    const guestCount = await Hotel.countDocuments({ type: 'Guest House' });
    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'Appartments', count: appartmentsCount },
      { type: 'Resorts', count: resortsCount },
      { type: 'Villas', count: villasCount },
      { type: 'Cabin House', count: cabinCount },
      { type: 'Cottages', count: cottagesCount },
      { type: 'Service Appartment', count: serviceCount },
      { type: 'Vacation Appartments', count: vacationCount },
      { type: 'Guest House', count: guestCount },
    ]);
  } catch (err) {
    next(err);
  }
};

//get hotel room
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
