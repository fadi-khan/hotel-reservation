import { useQuery } from '@tanstack/react-query';
import { carService } from '@/lib/services/car';

export const useCarsQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn: () => carService.searchCars(filters),
    staleTime: 30 * 1000, // 30 seconds for search results
    gcTime: 2 * 60 * 1000, // 2 minutes cache for search results
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useCarQuery = (carId) => {
  return useQuery({
    queryKey: ['car', carId],
    queryFn: () => carService.getCarById(carId),
    enabled: !!carId,
    staleTime: 0, // 2 minutes for individual car data
    gcTime: 0,
    retry: 3,
  });
};

export const usePopularCarsQuery = (options = {}) => {
  const { limit = 12, ...otherOptions } = options;
  
  return useQuery({
    queryKey: ['popular-cars', { limit, ...otherOptions }],
    queryFn: () => carService.getPopularCars({ limit, ...otherOptions }),
    staleTime: 2 * 60 * 1000, // 2 minutes for popular cars
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useFeaturedCarsQuery = (options = {}) => {
  const { conditionType, limit = 8, ...otherOptions } = options;
  
  return useQuery({
    queryKey: ['featured-cars', { conditionType, limit, ...otherOptions }],
    queryFn: () => carService.getFeaturedCars({ conditionType, limit, ...otherOptions }),
    staleTime: 2 * 60 * 1000, // 2 minutes for featured cars
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useRelatedCarsQuery = (filters = {}) => {
  const { currentCarId, makeSlug, modelSlug, limit = 8, ...otherFilters } = filters;
  
  return useQuery({
    queryKey: ['related-cars', { currentCarId, makeSlug, modelSlug, limit, ...otherFilters }],
    queryFn: () => carService.searchCars({ 
      limit,
      makeSlug,
      modelSlug,
      excludeId: currentCarId,
      ...otherFilters
    }),
    enabled: !!makeSlug || !!modelSlug || Object.keys(otherFilters).length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for related cars
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};