import * as yup from 'yup';
import {
  RegionalSpecs,
  OptionLevel,
  BodyType,
  Transmission,
  DriveType,
  FuelType,
  Color,
  Cylinders,
  OverallCondition,
  AccidentHistory,
  ComponentCondition,
  RoofType,
  EngineSize,
  CAR_VALIDATION,
  ConditionType,
} from './carConstants';

// Basic car information validation schema
export const basicCarSchema = yup.object().shape({
  year: yup
    .number()
    .required('Year is required')
    .min(CAR_VALIDATION.MIN_YEAR, `Year must be at least ${CAR_VALIDATION.MIN_YEAR}`)
    .max(CAR_VALIDATION.MAX_YEAR, `Year cannot exceed ${CAR_VALIDATION.MAX_YEAR}`)
    .integer('Year must be a whole number'),

  modelId: yup
    .number()
    .required('Car model is required')
    .positive('Please select a valid car model'),

  mileage: yup
    .number()
    .required('Mileage is required')
    .min(CAR_VALIDATION.MIN_MILEAGE, `Mileage cannot be less than ${CAR_VALIDATION.MIN_MILEAGE}`)
    .max(CAR_VALIDATION.MAX_MILEAGE, `Mileage cannot exceed ${CAR_VALIDATION.MAX_MILEAGE}`)
    .integer('Mileage must be a whole number'),

  regionalSpecs: yup
    .string()
    .required('Regional specs is required')
    .oneOf(Object.values(RegionalSpecs), 'Please select a valid regional specification'),

  engineSize: yup
    .string()
    .nullable()
    .test('engine-size', 'Please select a valid engine size', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(EngineSize).includes(value);
    }),

  optionLevel: yup
    .string()
    .nullable()
    .test('option-level', 'Please select a valid option level', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(OptionLevel).includes(value);
    }),

  bodyType: yup
    .string()
    .required('Body type is required')
    .oneOf(Object.values(BodyType), 'Please select a valid body type'),

  transmission: yup
    .string()
    .required('Transmission is required')
    .oneOf(Object.values(Transmission), 'Please select a valid transmission type'),

  driveType: yup
    .string()
    .nullable()
    .test('drive-type', 'Please select a valid drive type', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(DriveType).includes(value);
    }),

  noOfSeats: yup
    .number()
    .nullable()
    .min(CAR_VALIDATION.MIN_SEATS, `Seats must be at least ${CAR_VALIDATION.MIN_SEATS}`)
    .max(CAR_VALIDATION.MAX_SEATS, `Seats cannot exceed ${CAR_VALIDATION.MAX_SEATS}`)
    .integer('Number of seats must be a whole number'),

  fuelType: yup
    .string()
    .required('Fuel type is required')
    .oneOf(Object.values(FuelType), 'Please select a valid fuel type'),

  conditionType: yup
    .string()
    .required('Condition type is required')
    .oneOf(Object.values(ConditionType), 'Please select a valid condition type'),

  variant: yup
    .string()
    .max(CAR_VALIDATION.VARIANT_MAX_LENGTH, `Variant cannot exceed ${CAR_VALIDATION.VARIANT_MAX_LENGTH} characters`)
    .nullable(),

  color: yup
    .string()
    .required('Color is required')
    .oneOf(Object.values(Color), 'Please select a valid color'),

  cityId: yup
    .number()
    .required('City is required')
    .positive('Please select a valid city'),

  cylinders: yup
    .string()
    .required('Cylinders is required')
    .oneOf(Object.values(Cylinders), 'Please select a valid cylinder type'),
});

// Car details validation schema
export const carDetailsSchema = yup.object().shape({
  overallCondition: yup
    .string()
    .nullable()
    .test('overall-condition', 'Please select a valid condition', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(OverallCondition).includes(value);
    }),

  isAccidented: yup
    .string()
    .nullable()
    .test('accident-history', 'Please select a valid accident history', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(AccidentHistory).includes(value);
    }),

  accidentDetail: yup
    .string()
    .nullable()
    .max(CAR_VALIDATION.ACCIDENT_DETAIL_MAX_LENGTH, `Accident detail cannot exceed ${CAR_VALIDATION.ACCIDENT_DETAIL_MAX_LENGTH} characters`)
    .when('isAccidented', {
      is: (val) => val && val !== AccidentHistory.NEVER,
      then: (schema) => schema.required('Please provide accident details'),
      otherwise: (schema) => schema.nullable(),
    }),

  airBagsCondition: yup
    .string()
    .nullable()
    .test('air-bags-condition', 'Please select a valid condition', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(ComponentCondition).includes(value);
    }),

  chassisCondition: yup
    .string()
    .nullable()
    .test('chassis-condition', 'Please select a valid condition', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(ComponentCondition).includes(value);
    }),

  engineCondition: yup
    .string()
    .nullable()
    .test('engine-condition', 'Please select a valid condition', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(ComponentCondition).includes(value);
    }),

  gearBoxCondition: yup
    .string()
    .nullable()
    .test('gearbox-condition', 'Please select a valid condition', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(ComponentCondition).includes(value);
    }),

  alloyRims: yup
    .boolean()
    .nullable()
    .default(false),

  rimSize: yup
    .number()
    .when('alloyRims', {
      is: true,
      then: (schema) => schema
        .required('Rim size is required when alloy rims are selected')
        .min(CAR_VALIDATION.MIN_RIM_SIZE, `Rim size must be at least ${CAR_VALIDATION.MIN_RIM_SIZE}`)
        .max(CAR_VALIDATION.MAX_RIM_SIZE, `Rim size cannot exceed ${CAR_VALIDATION.MAX_RIM_SIZE}`)
        .integer('Rim size must be a whole number'),
      otherwise: (schema) => schema.nullable(),
    }),

  roofType: yup
    .string()
    .nullable()
    .test('roof-type', 'Please select a valid roof type', function(value) {
      if (!value || value === '') return true; // Allow empty/null values
      return Object.values(RoofType).includes(value);
    }),

  currentlyFinanced: yup
    .boolean()
    .default(false),

  firstOwner: yup
    .boolean()
    .default(false),

  specialAboutCar: yup
    .string()
    .max(CAR_VALIDATION.SPECIAL_ABOUT_CAR_MAX_LENGTH, `Special about car cannot exceed ${CAR_VALIDATION.SPECIAL_ABOUT_CAR_MAX_LENGTH} characters`)
    .nullable(),
});

// Car features validation schema (all boolean features)
export const carFeaturesSchema = yup.object().shape({
  // Safety Features
  blindSpotMonitor: yup.boolean().default(false),
  laneKeepAssist: yup.boolean().default(false),
  preCollisionSystem: yup.boolean().default(false),
  brakeAssist: yup.boolean().default(false),

  // Exterior Features
  ledHeadlights: yup.boolean().default(false),
  fogLights: yup.boolean().default(false),

  // Entertainment & Technology
  bluetooth: yup.boolean().default(false),
  carplay: yup.boolean().default(false),
  rearEntertainment: yup.boolean().default(false),
  premiumSound: yup.boolean().default(false),
  headsUpDisplay: yup.boolean().default(false),
  navigationSystem: yup.boolean().default(false),
  digitalDisplay: yup.boolean().default(false),

  // Convenience Features
  parkingSensors: yup.boolean().default(false),
  cruiseControl: yup.boolean().default(false),
  reversingCamera: yup.boolean().default(false),
  birdsEyeCamera: yup.boolean().default(false),
  digitalDisplayMirror: yup.boolean().default(false),
  automatedParking: yup.boolean().default(false),
  adaptiveCruiseControl: yup.boolean().default(false),
  steeringControls: yup.boolean().default(false),
  paddleShifters: yup.boolean().default(false),
  autoDimmingMirror: yup.boolean().default(false),

  // Interior Features
  leatherSeats: yup.boolean().default(false),
  pushButtonStart: yup.boolean().default(false),
  remoteStart: yup.boolean().default(false),
  ambientLighting: yup.boolean().default(false),
  keylessEntry: yup.boolean().default(false),
  powerSeats: yup.boolean().default(false),
  memorySeats: yup.boolean().default(false),
  powerFoldingMirrors: yup.boolean().default(false),
  softCloseDoor: yup.boolean().default(false),
  electricRunningBoard: yup.boolean().default(false),
  handsFreeLifgate: yup.boolean().default(false),
  massageSeats: yup.boolean().default(false),
  heatedCooledSeats: yup.boolean().default(false),
  lumbarSupport: yup.boolean().default(false),

  // Maintenance & Modifications
  newBrakePads: yup.boolean().default(false),
  agencyMaintained: yup.boolean().default(false),
  specialModifications: yup.boolean().default(false),
  newBattery: yup.boolean().default(false),
  newTyres: yup.boolean().default(false),
  premiumAccessories: yup.boolean().default(false),
});

// Car pricing validation schema
export const carPricingSchema = yup.object().shape({
  listingPrice: yup
    .number()
    .required('Listing price is required')
    .min(CAR_VALIDATION.MIN_PRICE, `Price must be at least ${CAR_VALIDATION.MIN_PRICE}`)
    .max(CAR_VALIDATION.MAX_PRICE, `Price cannot exceed ${CAR_VALIDATION.MAX_PRICE}`)
    .positive('Price must be a positive number'),

  discountPercentage: yup
    .number()
    .optional()
    .min(0, `Discount percentage must be at least 0%`)
    .max(100, `Discount percentage cannot exceed 100%`)
    .test('decimal-places', 'Discount percentage can have at most 2 decimal places', (value) => {
      if (value == null) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),

  isFeatured: yup
    .boolean()
    .default(false),
});

// Car documents validation schema
export const carDocumentsSchema = yup.object().shape({
  documents: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().required('Document type is required'),
        attachmentId: yup.number().required('Image upload is required').positive('Invalid attachment'),
        description: yup.string().max(200, 'Description cannot exceed 200 characters').nullable(),
      })
    )
    .min(1, 'At least one image is required')
    .max(CAR_VALIDATION.MAX_IMAGES, `Cannot exceed ${CAR_VALIDATION.MAX_IMAGES} images`),
});

// Complete car creation/update validation schema
export const completeCarSchema = yup.object().shape({
  ...basicCarSchema.fields,
  ...carDetailsSchema.fields,
  ...carFeaturesSchema.fields,
  ...carPricingSchema.fields,
  ...carDocumentsSchema.fields,
});

// Helper function to validate individual wizard steps
export const validateCarStep = (step, data) => {
  let schema;
  
  switch (step) {
    case 1: // Basic Info
      schema = basicCarSchema;
      break;
    case 2: // Details
      schema = carDetailsSchema;
      break;
    case 3: // Features
      schema = carFeaturesSchema;
      break;
    case 4: // Documents
      schema = carDocumentsSchema;
      break;
    case 5: // Pricing
      schema = carPricingSchema;
      break;
    default:
      schema = completeCarSchema;
  }

  try {
    schema.validateSync(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};

// Helper function to get all enum options for form dropdowns
export const getEnumOptions = (enumObj, labelsObj) => {
  return Object.entries(enumObj).map(([key, value]) => ({
    value,
    label: labelsObj[value] || key,
  }));
};