const mongooseToObject = (object) => {
  return object.toObject();
};

const multiMongooseToObject = (objects) => {
  return (objects = objects.map((mongoose) => mongoose.toObject()));
};

export { mongooseToObject, multiMongooseToObject };
