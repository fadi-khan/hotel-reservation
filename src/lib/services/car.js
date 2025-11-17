import { httpService } from './HttpService';

export const carService = {
  searchCars: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'latest',
        keyword = '',
        q = '',
        searchByBusiness = '',
        conditionType,
        regionalSpecs,
        optionLevel,
        bodyType,
        transmission,
        driveType,
        fuelType,
        color,
        cylinders,
        overallCondition,
        accidentHistory,
        airBagsCondition,
        chassisCondition,
        engineCondition,
        gearBoxCondition,
        roofType,
        makeId,
        modelId,
        cityId,
        makeSlug,
        modelSlug,
        citySlug,
        minPrice,
        maxPrice,
        minMileage,
        maxMileage,
        minYear,
        maxYear,
        isFeatured,
        hasDiscount,
      } = params;

      const queryParams = new URLSearchParams();
      // Add all parameters to query string if they exist
      if (page) queryParams.append('page', page);
      if (limit) queryParams.append('limit', limit);
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (keyword) queryParams.append('keyword', keyword);
      if (q) queryParams.append('q', q);
      if (searchByBusiness) queryParams.append('searchByBusiness', searchByBusiness);
      if (conditionType) queryParams.append('conditionType', conditionType);
      if (regionalSpecs) queryParams.append('regionalSpecs', regionalSpecs);
      if (optionLevel) queryParams.append('optionLevel', optionLevel);
      if (bodyType) queryParams.append('bodyType', bodyType);
      if (transmission) {
        (Array.isArray(transmission) ? transmission : [transmission])
          .forEach(t => queryParams.append('transmission', t));
      }
      if (driveType) queryParams.append('driveType', driveType);
      if (fuelType) {
        (Array.isArray(fuelType) ? fuelType : [fuelType])
          .forEach(fuel => queryParams.append('fuelType', fuel));
      }
      if (color) queryParams.append('color', color);
      if (cylinders) queryParams.append('cylinders', cylinders);
      if (overallCondition) queryParams.append('overallCondition', overallCondition);
      if (accidentHistory) queryParams.append('accidentHistory', accidentHistory);
      if (airBagsCondition) queryParams.append('airBagsCondition', airBagsCondition);
      if (chassisCondition) queryParams.append('chassisCondition', chassisCondition);
      if (engineCondition) queryParams.append('engineCondition', engineCondition);
      if (gearBoxCondition) queryParams.append('gearBoxCondition', gearBoxCondition);
      if (roofType) queryParams.append('roofType', roofType);
      if (makeId) queryParams.append('makeId', makeId);
      if (modelId) queryParams.append('modelId', modelId);
      if (cityId) queryParams.append('cityId', cityId);
      if (makeSlug) queryParams.append('makeSlug', makeSlug);
      if (modelSlug) queryParams.append('modelSlug', modelSlug);
      if (citySlug) queryParams.append('citySlug', citySlug);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      if (minMileage) queryParams.append('minMileage', minMileage);
      if (maxMileage) queryParams.append('maxMileage', maxMileage);
      if (minYear) queryParams.append('minYear', minYear);
      if (maxYear) queryParams.append('maxYear', maxYear);
      if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured);
      if (hasDiscount !== undefined) queryParams.append('hasDiscount', hasDiscount);

      const response = await httpService.get(`cars/search?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search cars. Please try again.');
    }
  },

  getCarById: async (carId) => {
    try {
      const response = await httpService.get(`cars/${carId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch car details. Please try again.');
    }
  },

  getFeaturedCars: async (params = {}) => {
    try {
      const { conditionType, limit = 8 } = params;
      const searchParams = {
        limit,
        sortBy: 'latest',
        isFeatured: true,
        ...(conditionType && { conditionType })
      };
      
      return await carService.searchCars(searchParams);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured cars. Please try again.');
    }
  },

  getPopularCars: async (params = {}) => {
    try {
      const { limit = 12 } = params;
      const searchParams = {
        limit,
        sortBy: 'trending',
      };
      
      return await carService.searchCars(searchParams);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch popular cars. Please try again.');
    }
  },

  constructImageUrl: (imageUrl) => {
    if (!imageUrl) return '/images/listing/1.jpg';
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/';
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    return `${backendUrl}${imageUrl}`;
  }
};